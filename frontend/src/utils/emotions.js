export const EMOTION_CONFIG = {
  joy: { emoji: '😊', color: '#FFD700', label: 'Joy' },
  sadness: { emoji: '😢', color: '#4A90D9', label: 'Sadness' },
  anger: { emoji: '😠', color: '#E74C3C', label: 'Anger' },
  fear: { emoji: '😨', color: '#9B59B6', label: 'Fear' },
  surprise: { emoji: '😲', color: '#F39C12', label: 'Surprise' },
  disgust: { emoji: '🤢', color: '#27AE60', label: 'Disgust' },
  neutral: { emoji: '😐', color: '#95A5A6', label: 'Neutral' },
};

export function getEmotionConfig(emotion) {
  return EMOTION_CONFIG[emotion] || EMOTION_CONFIG.neutral;
}

export function getInitials(username) {
  if (!username) return '?';
  return username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
