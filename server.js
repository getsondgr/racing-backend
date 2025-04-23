const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

let players = [];
let leaderboard = [];

app.use(cors());
app.use(express.json());

// Place a bet
app.post('/api/bet', (req, res) => {
  const { name, bet, vehicle } = req.body;
  players.push({ name, bet, vehicle });

  // Race logic (lowest bet wins)
  setTimeout(() => {
    const sorted = [...players].sort((a, b) => a.bet - b.bet);
    const winner = sorted[0];
    const isWinner = winner.name === name;

    if (isWinner) {
      leaderboard.unshift({ name, vehicle, bet, time: new Date().toLocaleTimeString() });
      leaderboard = leaderboard.slice(0, 5); // keep top 5
    }

    res.json({
      message: `${name}, you chose ${vehicle}. ${isWinner ? 'YOU WON 🎉' : 'Winner is ' + winner.vehicle}`
    });

    setTimeout(() => {
      players = []; // reset race after 10 sec
    }, 10000);
  }, 3000); // 3 sec delay to show result
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Start server
app.listen(port, () => {
  console.log(`✅ Racing Game backend LIVE at https://racing-backend.onrender.com`);
});
