import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BotCollection from './Components/BotCollection';
import YourBotArmy from './Components/YourBotArmy';
import BotSpecs from './Components/BotSpecs';
import './index.css';

const App = () => {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [filterClass, setFilterClass] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setBots(data);
      });
  }, []);

  const handleEnlistBot = (bot) => {
    const isBotAlreadyEnlisted = enlistedBots.some((b) => b.bot_class === bot.bot_class);
    if (!isBotAlreadyEnlisted) {
      setEnlistedBots([...enlistedBots, bot]);
      setBots(bots.filter((b) => b.id !== bot.id));
    }
  };

  const handleReleaseBot = (bot) => {
    setEnlistedBots(enlistedBots.filter((b) => b.id !== bot.id));
    setBots([...bots, bot]);
  };

  const handleDischargeBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setEnlistedBots(enlistedBots.filter((b) => b.id !== bot.id));
        setBots(bots.filter((b) => b.id !== bot.id));
      })
      .catch((error) => console.error('Error:', error));
  };

  console.log('Filtered bots:', bots);

  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Bot Collection</Link>
            </li>
            <li>
              <Link to="/your-bot-army">Your Bot Army</Link>
            </li>
          </ul>
        </nav>
        <div className="filter-bar">
          <label htmlFor="filter">Filter by Class:</label>
          <select id="filter" value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">All</option>
            <option value="Support">Support</option>
            <option value="Medic">Medic</option>
            <option value="Assault">Assault</option>
            <option value="Defender">Defender</option>
            <option value="Captain">Captain</option>
            <option value="Witch">Witch</option>
          </select>
        </div>
        <YourBotArmy
          enlistedBots={enlistedBots}
          handleReleaseBot={handleReleaseBot}
          handleDischargeBot={handleDischargeBot}
        />
        <Routes>
          <Route
            path="/bots/:botId"
            element={
              <BotSpecs
                enlistedBots={enlistedBots}
                handleEnlistBot={handleEnlistBot}
                handleReleaseBot={handleReleaseBot}
                handleDischargeBot={handleDischargeBot}
              />
            }
          />
          <Route
            path="/"
            element={
              <BotCollection
                bots={bots}
                enlistedBots={enlistedBots}
                handleEnlistBot={handleEnlistBot}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
