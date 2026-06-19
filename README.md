# MoodTune 🎵

An emotion-based music recommendation chatbot. Tell MoodTune how you feel, and it uses AI to detect your emotion and recommend music that matches your mood.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS + Vite |
| Backend | FastAPI (Python) |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Tokens) |
| AI Model | HuggingFace `j-hartmann/emotion-english-distilroberta-base` |
| HTTP Client | Axios |

## Features

- **Emotion Detection** — AI analyzes your message and detects one of 7 emotions (joy, sadness, anger, fear, surprise, disgust, neutral)
- **Music Recommendations** — 5 curated song suggestions per emotion with YouTube links
- **Mood History** — Every chat interaction is saved automatically
- **Favourites** — Save songs you love for later
- **Analytics** — View session stats and emotion breakdown chart
- **JWT Authentication** — Secure login/signup with 24-hour tokens

## Project Structure

```
moodtune/
├── backend/
│   ├── main.py          # FastAPI app & routes
│   ├── auth.py          # JWT & password hashing
│   ├── models.py        # SQLAlchemy models
│   ├── database.py      # DB connection
│   ├── emotion.py       # HuggingFace emotion detection
│   ├── music.py         # Emotion → song mapping
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/       # Login, Signup, Chat, History, Analytics, Favourites
│   │   ├── components/  # Sidebar, SongCard, MoodChart
│   │   └── api/         # Axios setup
│   └── package.json
└── README.md
```

## Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL

## Database Setup

1. Install and start PostgreSQL
2. Create the database:

```sql
CREATE DATABASE moodtune;
```

3. Tables are created automatically when the backend starts.

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://postgres:1234@localhost:5432/moodtune
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

Start the server:

```bash
uvicorn main:app --reload
```

API runs at `http://localhost:8000`

> **Note:** The first chat request downloads the HuggingFace emotion model (~300MB). This may take a minute.

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | No | Register new user |
| POST | `/auth/login` | No | Login, returns JWT |
| POST | `/chat` | Yes | Detect emotion & get music |
| GET | `/history` | Yes | Get mood history |
| DELETE | `/history/{id}` | Yes | Delete history entry |
| POST | `/favourites` | Yes | Save a song |
| GET | `/favourites` | Yes | Get saved songs |
| DELETE | `/favourites/{id}` | Yes | Remove a favourite |
| GET | `/analytics` | Yes | Get mood analytics |

## Emotion → Music Mapping

| Emotion | Genre | Example Songs |
|---------|-------|---------------|
| 😊 Joy | Upbeat & Happy | Happy, Uptown Funk, Shake It Off |
| 😢 Sadness | Soft & Soothing | Someone Like You, Fix You |
| 😠 Anger | Rock & Powerful | Lose Yourself, Numb |
| 😨 Fear | Calm & Ambient | Weightless, Clair de Lune |
| 😲 Surprise | Energetic & Electronic | Blinding Lights, Levitating |
| 🤢 Disgust | Refreshing & Uplifting | Here Comes the Sun |
| 😐 Neutral | Lo-fi & Chill | Lofi Study Beats, Jazz Cafe |

## Usage

1. Sign up at `/signup`
2. Log in at `/login`
3. Open **Chat** and type how you're feeling (e.g. "I'm feeling really happy today!")
4. MoodTune detects your emotion and shows 5 song recommendations
5. Click ▶ to open songs on YouTube, or ♡ to save to Favourites
6. View past sessions in **History** and insights in **Analytics**

## Environment Variables

### Backend (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://postgres:1234@localhost:5432/moodtune` | PostgreSQL connection |
| `SECRET_KEY` | `your_secret_key_here` | JWT signing key |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Token expiry (24 hours) |

### Frontend (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API URL |

## License

MIT
