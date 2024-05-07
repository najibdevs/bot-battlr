import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BotSpecs = ({
  enlistedBots,
  handleEnlistBot,
  handleReleaseBot,
  handleDischargeBot,
}) => {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bots/${botId}`);
        const data = await response.json();
        setBot(data);
      } catch (error) {
        console.error('Error fetching bot data:', error);
      }
    };
    fetchBotData();
  }, [botId]);

  const handleEnlistAndNavigate = (bot) => {
    handleEnlistBot(bot);
    navigate('/');
  };

  if (!bot) {
    return <div>Loading bot details...</div>;
  } else if (bot.error) {
    return <div>Bot not found</div>;
  }

  return (
    <div className="bot-specs">
      <div className="bot-specs-image">
        <img src={bot.avatar_url} alt={bot.name} />
      </div>
      <div className="bot-specs-content">
        <h2>Name: {bot.name}</h2>
        <p className="bot-specs-catchphrase">Catchphrase:</p>
        <p className="catchphrase">{bot.catchphrase}</p>
        <p className="bot-specs-class">Class: {bot.bot_class}</p>
        <div className="bot-specs-stats effect">
          <div className="stat">
            <span>
              <i className="fa-solid fa-heart-crack border" style={{ color: '#ff0000' }}></i> {bot.health}
            </span>
          </div>
          <div className="stat">
            <span>
              <i className="fa-solid fa-bolt-lightning border" style={{ color: '#FFD43B' }}></i> {bot.damage}
            </span>
          </div>
          <div className="stat">
            <span>
              <i className="fas fa-shield-alt border" style={{ color: 'green' }}></i> {bot.armor}
            </span>
          </div>
        </div>
        <div className="bot-specs-buttons">
          <Link to="/">
            <button>Back</button>
          </Link>
          {enlistedBots.some((b) => b.id === bot.id) ? (
            <button onClick={() => handleReleaseBot(bot)}>Release</button>
          ) : (
            <button onClick={() => handleEnlistAndNavigate(bot)}>Enlist</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotSpecs;
