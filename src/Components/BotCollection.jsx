import React from 'react';
import { Link } from 'react-router-dom';
import BotCard from './BotCard';

const BotCollection = ({ bots, enlistedBots, handleEnlistBot }) => {
  return (
    <div className="bot-collection">
      {bots.map((bot) => (
        <Link key={bot.id} to={`/bots/${bot.id}`}>
          <BotCard bot={bot} isEnlisted={enlistedBots.some((b) => b.id === bot.id)} />
        </Link>
      ))}
    </div>
  );
};

export default BotCollection;