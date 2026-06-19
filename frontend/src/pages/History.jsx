import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';
import { getEmotionConfig } from '../utils/emotions';

function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const { data } = await API.get('/history');
      setEntries(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/history/${id}`);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError('Failed to delete entry.');
    }
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <header className="px-6 py-4 border-b border-white/5 bg-dark-secondary/50">
          <h2 className="text-lg font-semibold text-white">History</h2>
          <p className="text-sm text-gray-500">Your past mood sessions</p>
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

          {!loading && entries.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-4xl mb-3">📜</p>
              <p>No mood history yet. Start chatting to build your history!</p>
            </div>
          )}

          <div className="space-y-3 max-w-2xl">
            {entries.map((entry) => {
              const config = getEmotionConfig(entry.emotion);
              return (
                <div
                  key={entry.id}
                  className="p-4 bg-dark-secondary rounded-xl border border-white/5 hover:border-white/10 transition-colors animate-slide-up"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm mb-2">"{entry.message}"</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${config.color}20`,
                            color: config.color,
                          }}
                        >
                          {config.emoji} {config.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {entry.confidence}% confidence
                        </span>
                        <span className="text-xs text-gray-600">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1 shrink-0"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default History;
