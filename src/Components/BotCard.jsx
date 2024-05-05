// BotCard.jsx
import React from 'react';

const BotCard = ({ bot, isEnlisted }) => {
  return (
    <div className="bot-card">
      <img src={bot.avatar_url} alt={bot.name} />
      <div className="bot-card-content">
        <h3>{bot.name}</h3>
        <p>{bot.catchphrase}</p>
        <div className="bot-specs-stats">
          <div className="bot-specs-stat">
            <span>
              <i className="fa-solid fa-heart-crack"></i> {bot.health}
            </span>
          </div>
          <div className="bot-specs-stat">
            <span>
              <i className="fa-solid fa-bolt-lightning"></i> {bot.damage}
            </span>
          </div>
          <div className="bot-specs-stat">
            <span>
              <i className="fas fa-shield-alt"></i> {bot.armor}
            </span>
          </div>
        </div>
        {isEnlisted && <span className="enlisted-badge">Enlisted</span>}
      </div>
    </div>
  );
};

export default BotCard;