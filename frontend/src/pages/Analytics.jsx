import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MoodChart from '../components/MoodChart';
import API from '../api/axios';
import { getEmotionConfig } from '../utils/emotions';

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: analytics } = await API.get('/analytics');
        setData(analytics);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const topEmotionConfig = data ? getEmotionConfig(data.top_emotion) : null;

  const statCards = data
    ? [
        {
          label: 'Total Sessions',
          value: data.total_sessions,
          icon: '💬',
          color: '#7F77DD',
        },
        {
          label: 'Top Emotion',
          value: data.top_emotion === 'none' ? '—' : `${topEmotionConfig?.emoji} ${topEmotionConfig?.label}`,
          icon: '🎭',
          color: topEmotionConfig?.color || '#95A5A6',
        },
        {
          label: 'Songs Saved',
          value: data.songs_played,
          icon: '🎵',
          color: '#F39C12',
        },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <header className="px-6 py-4 border-b border-white/5 bg-dark-secondary/50">
          <h2 className="text-lg font-semibold text-white">Analytics</h2>
          <p className="text-sm text-gray-500">Your mood insights at a glance</p>
        </header>

        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="p-5 bg-dark-secondary rounded-xl border border-white/5 animate-slide-up"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{card.icon}</span>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: card.color }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-dark-secondary rounded-xl border border-white/5 p-6">
                <h3 className="text-white font-semibold mb-1">Emotion Breakdown</h3>
                <p className="text-sm text-gray-500 mb-6">Distribution of your detected emotions</p>
                <MoodChart data={data.emotion_breakdown} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Analytics;
