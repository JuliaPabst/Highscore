const mongoose = require('mongoose');
const { Schema } = mongoose;

// HighScore Schema
const HighScoreSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// HighScoreListe Schema (Array of HighScores)
const HighScoreListeSchema = new Schema({
  game: {
    type: String,
    required: true,
    trim: true
  },
  highScores: [HighScoreSchema]
});

const HighScore = mongoose.model('HighScore', HighScoreSchema);
const HighScoreListe = mongoose.model('HighScoreListe', HighScoreListeSchema);

module.exports = { HighScore, HighScoreListe };
