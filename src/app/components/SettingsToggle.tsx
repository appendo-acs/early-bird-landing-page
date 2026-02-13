import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sound';
import { useState } from 'react';

export function SettingsToggle() {
  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  const handleThemeToggle = () => {
    soundManager.playClick();
    toggleTheme();
  };

  const handleSoundToggle = () => {
    soundManager.toggle();
    setSoundEnabled(soundManager.isEnabled());
    if (soundManager.isEnabled()) {
      soundManager.playSuccess();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Sound Toggle */}
      <button
        onClick={handleSoundToggle}
        className="p-2.5 sm:p-3 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-primary)] rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,182,122,0.3)] backdrop-blur-sm group"
        aria-label="Toggle sound"
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
        )}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="p-2.5 sm:p-3 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-primary)] rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,182,122,0.3)] backdrop-blur-sm group"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
        )}
      </button>
    </div>
  );
}
