import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';
import { getEmotionConfig } from '../utils/emotions';

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavourites = async () => {
    try {
      const { data } = await API.get('/favourites');
      setFavourites(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load favourites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await API.delete(`/favourites/${id}`);
      setFavourites((prev) => prev.filter((f) => f.id !== id));
    } catch {
      setError('Failed to remove favourite.');
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <header className="px-6 py-4 border-b border-white/5 bg-dark-secondary/50">
          <h2 className="text-lg font-semibold text-white">Favourites</h2>
          <p className="text-sm text-gray-500">Your saved songs</p>
        </header>

        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          {!loading && favourites.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-4xl mb-3">❤️</p>
              <p>No favourite songs yet. Save songs from the chat!</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favourites.map((fav) => {
              const config = getEmotionConfig(fav.emotion);
              return (
                <div
                  key={fav.id}
                  className="p-4 bg-dark-secondary rounded-xl border border-white/5 hover:border-accent/20 transition-all group animate-slide-up"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <a
                      href={fav.song_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium text-sm hover:text-accent transition-colors line-clamp-2"
                    >
                      {fav.song_title}
                    </a>
                    <button
                      onClick={() => handleRemove(fav.id)}
                      className="text-red-400 hover:text-red-300 transition-colors shrink-0 text-lg"
                      title="Remove from favourites"
                    >
                      ❤️
                    </button>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor: `${config.color}20`,
                      color: config.color,
                    }}
                  >
                    {config.emoji} {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Favourites;
