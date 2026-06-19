from datetime import datetime
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from auth import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from database import Base, engine, get_db
from emotion import detect_emotion
from models import FavouriteSong, MoodHistory, User
from music import get_music_recommendations

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MoodTune API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Schemas ---

class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    username: str


class ChatRequest(BaseModel):
    message: str


class FavouriteRequest(BaseModel):
    song_title: str
    song_url: str
    emotion: str


# --- Auth Routes ---

@app.post("/auth/signup", status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.username == request.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(
        username=request.username,
        email=request.email,
        password=hash_password(request.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created successfully", "username": user.username}


@app.post("/auth/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
    }


# --- Chat Routes ---

@app.post("/chat")
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    emotion_result = detect_emotion(request.message)
    recommendations = get_music_recommendations(emotion_result["emotion"])

    history_entry = MoodHistory(
        user_id=current_user.id,
        message=request.message,
        emotion=emotion_result["emotion"],
        confidence=emotion_result["confidence"],
    )
    db.add(history_entry)
    db.commit()

    return {
        "message": request.message,
        "emotion": emotion_result["emotion"],
        "confidence": emotion_result["confidence"],
        "emoji": recommendations["emoji"],
        "color": recommendations["color"],
        "genre": recommendations["genre"],
        "description": recommendations["description"],
        "songs": recommendations["songs"],
    }


# --- History Routes ---

@app.get("/history")
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entries = (
        db.query(MoodHistory)
        .filter(MoodHistory.user_id == current_user.id)
        .order_by(MoodHistory.created_at.desc())
        .all()
    )
    return [
        {
            "id": entry.id,
            "message": entry.message,
            "emotion": entry.emotion,
            "confidence": entry.confidence,
            "created_at": entry.created_at.isoformat(),
        }
        for entry in entries
    ]


@app.delete("/history/{entry_id}")
def delete_history(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entry = (
        db.query(MoodHistory)
        .filter(MoodHistory.id == entry_id, MoodHistory.user_id == current_user.id)
        .first()
    )
    if not entry:
        raise HTTPException(status_code=404, detail="History entry not found")

    db.delete(entry)
    db.commit()
    return {"message": "History entry deleted"}


# --- Favourites Routes ---

@app.post("/favourites", status_code=status.HTTP_201_CREATED)
def add_favourite(
    request: FavouriteRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    favourite = FavouriteSong(
        user_id=current_user.id,
        song_title=request.song_title,
        song_url=request.song_url,
        emotion=request.emotion,
    )
    db.add(favourite)
    db.commit()
    db.refresh(favourite)
    return {
        "id": favourite.id,
        "song_title": favourite.song_title,
        "song_url": favourite.song_url,
        "emotion": favourite.emotion,
        "created_at": favourite.created_at.isoformat(),
    }


@app.get("/favourites")
def get_favourites(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    favourites = (
        db.query(FavouriteSong)
        .filter(FavouriteSong.user_id == current_user.id)
        .order_by(FavouriteSong.created_at.desc())
        .all()
    )
    return [
        {
            "id": fav.id,
            "song_title": fav.song_title,
            "song_url": fav.song_url,
            "emotion": fav.emotion,
            "created_at": fav.created_at.isoformat(),
        }
        for fav in favourites
    ]


@app.delete("/favourites/{fav_id}")
def delete_favourite(
    fav_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    favourite = (
        db.query(FavouriteSong)
        .filter(FavouriteSong.id == fav_id, FavouriteSong.user_id == current_user.id)
        .first()
    )
    if not favourite:
        raise HTTPException(status_code=404, detail="Favourite not found")

    db.delete(favourite)
    db.commit()
    return {"message": "Favourite removed"}


# --- Analytics Route ---

@app.get("/analytics")
def get_analytics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entries = (
        db.query(MoodHistory)
        .filter(MoodHistory.user_id == current_user.id)
        .all()
    )
    favourites_count = (
        db.query(FavouriteSong)
        .filter(FavouriteSong.user_id == current_user.id)
        .count()
    )

    total_sessions = len(entries)
    emotion_counts: dict = {}
    for entry in entries:
        emotion_counts[entry.emotion] = emotion_counts.get(entry.emotion, 0) + 1

    top_emotion = max(emotion_counts, key=emotion_counts.get) if emotion_counts else "none"
    total = sum(emotion_counts.values()) or 1
    emotion_breakdown = [
        {
            "emotion": emotion,
            "count": count,
            "percentage": round((count / total) * 100, 1),
        }
        for emotion, count in sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)
    ]

    return {
        "total_sessions": total_sessions,
        "top_emotion": top_emotion,
        "songs_played": favourites_count,
        "emotion_breakdown": emotion_breakdown,
    }


@app.get("/")
def root():
    return {"message": "Welcome to MoodTune API"}
