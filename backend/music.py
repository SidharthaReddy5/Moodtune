EMOTION_MUSIC = {
    "joy": {
        "genre": "Upbeat & Happy Music",
        "description": "Bright, uplifting tracks to match your positive energy.",
        "songs": [
            {"title": "Happy - Pharrell Williams", "url": "https://www.youtube.com/results?search_query=Happy+Pharrell+Williams"},
            {"title": "Uptown Funk - Bruno Mars", "url": "https://www.youtube.com/results?search_query=Uptown+Funk+Bruno+Mars"},
            {"title": "Can't Stop the Feeling - Justin Timberlake", "url": "https://www.youtube.com/results?search_query=Can't+Stop+the+Feeling+Justin+Timberlake"},
            {"title": "Good as Hell - Lizzo", "url": "https://www.youtube.com/results?search_query=Good+as+Hell+Lizzo"},
            {"title": "Shake It Off - Taylor Swift", "url": "https://www.youtube.com/results?search_query=Shake+It+Off+Taylor+Swift"},
        ],
    },
    "sadness": {
        "genre": "Soft & Soothing Music",
        "description": "Gentle melodies to comfort and soothe your soul.",
        "songs": [
            {"title": "Someone Like You - Adele", "url": "https://www.youtube.com/results?search_query=Someone+Like+You+Adele"},
            {"title": "Fix You - Coldplay", "url": "https://www.youtube.com/results?search_query=Fix+You+Coldplay"},
            {"title": "The Night We Met - Lord Huron", "url": "https://www.youtube.com/results?search_query=The+Night+We+Met+Lord+Huron"},
            {"title": "Let Her Go - Passenger", "url": "https://www.youtube.com/results?search_query=Let+Her+Go+Passenger"},
            {"title": "Skinny Love - Bon Iver", "url": "https://www.youtube.com/results?search_query=Skinny+Love+Bon+Iver"},
        ],
    },
    "anger": {
        "genre": "Rock & Powerful Music",
        "description": "Intense, powerful tracks to channel your energy.",
        "songs": [
            {"title": "Lose Yourself - Eminem", "url": "https://www.youtube.com/results?search_query=Lose+Yourself+Eminem"},
            {"title": "In The End - Linkin Park", "url": "https://www.youtube.com/results?search_query=In+The+End+Linkin+Park"},
            {"title": "Numb - Linkin Park", "url": "https://www.youtube.com/results?search_query=Numb+Linkin+Park"},
            {"title": "Break Stuff - Limp Bizkit", "url": "https://www.youtube.com/results?search_query=Break+Stuff+Limp+Bizkit"},
            {"title": "Given Up - Linkin Park", "url": "https://www.youtube.com/results?search_query=Given+Up+Linkin+Park"},
        ],
    },
    "fear": {
        "genre": "Calm & Ambient Music",
        "description": "Peaceful ambient sounds to ease your mind.",
        "songs": [
            {"title": "Weightless - Marconi Union", "url": "https://www.youtube.com/results?search_query=Weightless+Marconi+Union"},
            {"title": "Clair de Lune - Debussy", "url": "https://www.youtube.com/results?search_query=Clair+de+Lune+Debussy"},
            {"title": "Experience - Ludovico Einaudi", "url": "https://www.youtube.com/results?search_query=Experience+Ludovico+Einaudi"},
            {"title": "Breathe - Pink Floyd", "url": "https://www.youtube.com/results?search_query=Breathe+Pink+Floyd"},
            {"title": "Peaceful Piano", "url": "https://www.youtube.com/results?search_query=Peaceful+Piano"},
        ],
    },
    "surprise": {
        "genre": "Energetic & Electronic",
        "description": "High-energy beats to match your excitement.",
        "songs": [
            {"title": "Blinding Lights - The Weeknd", "url": "https://www.youtube.com/results?search_query=Blinding+Lights+The+Weeknd"},
            {"title": "Levitating - Dua Lipa", "url": "https://www.youtube.com/results?search_query=Levitating+Dua+Lipa"},
            {"title": "As It Was - Harry Styles", "url": "https://www.youtube.com/results?search_query=As+It+Was+Harry+Styles"},
            {"title": "Dynamite - BTS", "url": "https://www.youtube.com/results?search_query=Dynamite+BTS"},
            {"title": "Stay - Kid LAROI & Justin Bieber", "url": "https://www.youtube.com/results?search_query=Stay+Kid+LAROI+Justin+Bieber"},
        ],
    },
    "disgust": {
        "genre": "Refreshing & Uplifting",
        "description": "Fresh, positive vibes to reset your mood.",
        "songs": [
            {"title": "Here Comes the Sun - The Beatles", "url": "https://www.youtube.com/results?search_query=Here+Comes+the+Sun+The+Beatles"},
            {"title": "Don't Worry Be Happy - Bobby McFerrin", "url": "https://www.youtube.com/results?search_query=Don't+Worry+Be+Happy+Bobby+McFerrin"},
            {"title": "Walking on Sunshine - Katrina & The Waves", "url": "https://www.youtube.com/results?search_query=Walking+on+Sunshine+Katrina"},
            {"title": "Three Little Birds - Bob Marley", "url": "https://www.youtube.com/results?search_query=Three+Little+Birds+Bob+Marley"},
            {"title": "Beautiful Day - U2", "url": "https://www.youtube.com/results?search_query=Beautiful+Day+U2"},
        ],
    },
    "neutral": {
        "genre": "Lo-fi & Chill",
        "description": "Relaxed beats for a calm, balanced mood.",
        "songs": [
            {"title": "Lofi Study Beats", "url": "https://www.youtube.com/results?search_query=Lofi+Study+Beats"},
            {"title": "Chill Vibes", "url": "https://www.youtube.com/results?search_query=Chill+Vibes+Music"},
            {"title": "Coffee Shop Ambience", "url": "https://www.youtube.com/results?search_query=Coffee+Shop+Ambience"},
            {"title": "Jazz Cafe", "url": "https://www.youtube.com/results?search_query=Jazz+Cafe+Music"},
            {"title": "Peaceful Morning", "url": "https://www.youtube.com/results?search_query=Peaceful+Morning+Music"},
        ],
    },
}

EMOTION_EMOJIS = {
    "joy": "😊",
    "sadness": "😢",
    "anger": "😠",
    "fear": "😨",
    "surprise": "😲",
    "disgust": "🤢",
    "neutral": "😐",
}

EMOTION_COLORS = {
    "joy": "#FFD700",
    "sadness": "#4A90D9",
    "anger": "#E74C3C",
    "fear": "#9B59B6",
    "surprise": "#F39C12",
    "disgust": "#27AE60",
    "neutral": "#95A5A6",
}


def get_music_recommendations(emotion: str) -> dict:
    data = EMOTION_MUSIC.get(emotion, EMOTION_MUSIC["neutral"])
    return {
        "emotion": emotion,
        "emoji": EMOTION_EMOJIS.get(emotion, "😐"),
        "color": EMOTION_COLORS.get(emotion, "#95A5A6"),
        "genre": data["genre"],
        "description": data["description"],
        "songs": data["songs"],
    }
