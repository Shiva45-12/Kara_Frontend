import React, { useState } from 'react';
import { Palette, Save, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { theme, changeTheme } = useTheme();
  const [message, setMessage] = useState('');

  const handleThemeChange = (selectedTheme) => {
    changeTheme(selectedTheme);
    setMessage('Theme updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your admin panel preferences</p>
      </div>

      {message && (
        <div className="settings-message success">
          {message}
        </div>
      )}

      <div className="settings-grid">
        {/* Theme Settings */}
        <div className="settings-card">
          <div className="card-header">
            <div className="card-icon">
              <Palette size={24} />
            </div>
            <div>
              <h3 className="card-title">Theme Preferences</h3>
              <p className="card-description">Choose your preferred admin panel theme</p>
            </div>
          </div>

          <div className="theme-options">
            <div 
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <Sun size={20} />
              <span>Light</span>
            </div>
            <div 
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <Moon size={20} />
              <span>Dark</span>
            </div>
            <div 
              className={`theme-option ${theme === 'system' ? 'active' : ''}`}
              onClick={() => handleThemeChange('system')}
            >
              <Monitor size={20} />
              <span>System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;