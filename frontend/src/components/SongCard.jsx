import { getEmotionConfig } from '../utils/emotions';

function SongCard({ song, emotion, onFavourite }) {
  const config = getEmotionConfig(emotion);

  return (
    <div className="flex items-center gap-3 p-3 bg-dark-bg/60 rounded-xl border border-white/5 hover:border-accent/30 transition-all group">
      <a
        href={song.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shrink-0"
        title="Play on YouTube"
      >
        ▶
      </a>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{song.title}</p>
        <p className="text-xs text-gray-500">YouTube</p>
      </div>
      <button
        onClick={() => onFavourite(song)}
        className="text-gray-500 hover:text-red-400 transition-colors text-lg opacity-0 group-hover:opacity-100"
        title="Add to favourites"
      >
        ♡
      </button>
      <span
        className="text-xs px-2 py-0.5 rounded-full shrink-0"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.emoji}
      </span>
    </div>
  );
}

export default SongCard;
