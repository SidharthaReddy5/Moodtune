import { NavLink, useNavigate } from 'react-router-dom';
import { EMOTION_CONFIG, getInitials } from '../utils/emotions';

const navItems = [
  { to: '/chat', label: 'Chat', icon: '💬' },
  { to: '/history', label: 'History', icon: '📜' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
  { to: '/favourites', label: 'Favourites', icon: '❤️' },
];

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-dark-secondary border-r border-white/5 flex flex-col shrink-0">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          MoodTune
        </h1>
        <p className="text-xs text-gray-500 mt-1">Emotion-based music</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Emotions</p>
        <div className="space-y-2 px-2">
          {Object.entries(EMOTION_CONFIG).map(([key, { emoji, color, label }]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-gray-400">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <span>{emoji}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center text-accent font-bold text-sm">
            {getInitials(username)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{username}</p>
            <p className="text-xs text-gray-500">Logged in</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-white/5"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
