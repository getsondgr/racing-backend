
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let players = [];

app.use(cors());
app.use(express.json());

app.post('/api/bet', (req, res) => {
  const { name, bet, vehicle } = req.body;
  players.push({ name, bet, vehicle });

  // Simulate static winner logic after 1 minute
  setTimeout(() => {
  const sorted = [...players].sort((a, b) => a.bet - b.bet);
  const winner = sorted[0]; // player with lowest bet
  const isWinner = winner.name === name;

  res.json({ message: `${name}, you chose ${vehicle}. ${isWinner ? 'YOU WON 🎉' : 'Winner is ' + winner.vehicle}` });

  players = []; // reset after race
}, 3000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

