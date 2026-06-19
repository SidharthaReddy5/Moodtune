from functools import lru_cache

from transformers import pipeline


@lru_cache(maxsize=1)
def get_emotion_pipeline():
    return pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        top_k=1,
    )


def detect_emotion(text: str) -> dict:
    classifier = get_emotion_pipeline()
    result = classifier(text)[0][0]
    return {
        "emotion": result["label"].lower(),
        "confidence": round(result["score"] * 100, 2),
    }
