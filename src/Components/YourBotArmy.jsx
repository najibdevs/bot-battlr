import React from 'react';
import BotCard from './BotCard';

const YourBotArmy = ({ enlistedBots, handleReleaseBot, handleDischargeBot }) => {
  return (
    <div className="bot-army">
      {enlistedBots.map((bot) => (
        <BotCard
          key={`${bot.id}-${bot.name}`}
          bot={bot}
          isEnlisted={true}
          handleReleaseBot={handleReleaseBot}
          handleDischargeBot={handleDischargeBot}
        />
      ))}
    </div>
  );
};

export default YourBotArmy;