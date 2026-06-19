import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SongCard from '../components/SongCard';
import API from '../api/axios';
import { getEmotionConfig } from '../utils/emotions';

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: 'bot',
      text: "Hi! Tell me how you're feeling today and I'll recommend music that matches your mood. 🎵",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favNotice, setFavNotice] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError('');
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: 'user', text },
    ]);
    setLoading(true);

    try {
      const { data } = await API.post('/chat', { message: text });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: `I detected ${data.emotion} in your message. Here are some songs picked for you!`,
          emotion: data.emotion,
          confidence: data.confidence,
          emoji: data.emoji,
          color: data.color,
          genre: data.genre,
          description: data.description,
          songs: data.songs,
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFavourite = async (song, emotion) => {
    try {
      await API.post('/favourites', {
        song_title: song.title,
        song_url: song.url,
        emotion,
      });
      setFavNotice(`Added "${song.title}" to favourites!`);
      setTimeout(() => setFavNotice(''), 3000);
    } catch {
      setFavNotice('Failed to add to favourites.');
      setTimeout(() => setFavNotice(''), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="px-6 py-4 border-b border-white/5 bg-dark-secondary/50">
          <h2 className="text-lg font-semibold text-white">Chat</h2>
          <p className="text-sm text-gray-500">Share your feelings, get music recommendations</p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`animate-slide-up flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'user' ? (
                <div className="max-w-lg px-4 py-3 bg-accent rounded-2xl rounded-tr-sm text-white text-sm">
                  {msg.text}
                </div>
              ) : (
                <div className="max-w-2xl w-full">
                  <div className="px-4 py-3 bg-dark-secondary rounded-2xl rounded-tl-sm border border-white/5 text-gray-300 text-sm mb-3">
                    {msg.text}
                  </div>

                  {msg.emotion && (
                    <div className="bg-dark-secondary rounded-2xl border border-white/5 p-4 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${getEmotionConfig(msg.emotion).color}20`,
                            color: getEmotionConfig(msg.emotion).color,
                            border: `1px solid ${getEmotionConfig(msg.emotion).color}40`,
                          }}
                        >
                          {msg.emoji || getEmotionConfig(msg.emotion).emoji}{' '}
                          {getEmotionConfig(msg.emotion).label}
                          <span className="opacity-70">· {msg.confidence}%</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold">{msg.genre}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">{msg.description}</p>
                      </div>

                      <div className="space-y-2">
                        {msg.songs?.map((song, i) => (
                          <SongCard
                            key={i}
                            song={song}
                            emotion={msg.emotion}
                            onFavourite={(s) => handleFavourite(s, msg.emotion)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="px-4 py-3 bg-dark-secondary rounded-2xl border border-white/5 flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-400">Detecting your emotion...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm max-w-lg">
              {error}
            </div>
          )}

          {favNotice && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm max-w-lg animate-fade-in">
              {favNotice}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-white/5 bg-dark-secondary/50">
          <div className="flex gap-3 max-w-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="How are you feeling today?"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-dark-bg border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;
