import React from 'react';
import { Link } from 'react-router-dom';
import BotCard from './BotCard';

const BotCollection = ({ bots, enlistedBots, handleEnlistBot }) => {
  const availableBots = bots.filter((bot) => !enlistedBots.some((b) => b.id === bot.id));

  return (
    <div className="bot-collection">
      {availableBots.map((bot) => (
        <Link key={bot.id} to={`/bots/${bot.id}`}>
          <BotCard
            bot={bot}
            isEnlisted={false}
          />
        </Link>
      ))}
    </div>
  );
};

export default BotCollection;