var mongoose = require('mongoose');
var CharacterSchema = new mongoose.Schema({
  name: String,
  species: String,
  career: String,
  specialization: String,
  brawn: {type: Number, default: 0},
  agility: {type: Number, default: 0},
  intellect: {type: Number, default: 0},
  cunning: {type: Number, default: 0},
  willpower: {type: Number, default: 0},
  presence: {type: Number, default: 0},

  soakValue: {type: Number, default: 0},
  wounds: {type: Number, default: 0},
  strain: {type: Number, default: 0},
  defense: {type: Number, default: 0},

  //BR (brawn) general skills
  athletics: {type: Number, default: 0},
  resilience: {type: Number, default: 0},

  //PR (presence) general skills
  cool: {type: Number, default: 0},
  leadership: {type: Number, default: 0},
  negotiation: {type: Number, default: 0},

  //Will (will power) general skills
  coercion: {type: Number, default: 0},
  discipline: {type: Number, default: 0},
  vigilance: {type: Number, default: 0},

  //Int (intelligence) general skills
  computers: {type: Number, default: 0},
  mechanics: {type: Number, default: 0},
  medicine: {type: Number, default: 0},

  //AG (agility) general skills
  coordination: {type: Number, default: 0},
  pilotingPlanetary: {type: Number, default: 0},
  pilotingSpace: {type: Number, default: 0},

  //Cu (cunning)
  deception: {type: Number, default: 0},
  perception: {type: Number, default: 0},
  skulduggery: {type: Number, default: 0},
  streetwise: {type: Number, default: 0},
  survival: {type: Number, default: 0},

//////////////////////////////////////////////////////////
//COMBAT SKILLS
//BR
brawl: {type: Number, default: 0},
melee: {type: Number, default: 0},

//AG
gunnery: {type: Number, default: 0},
rangedLight: {type: Number, default: 0},
rangedHeavy: {type: Number, default: 0},

//////////////////////////////////////////////////////////
// Knowledge skills
//Int
coreWorlds: {type: Number, default: 0},
education: {type: Number, default: 0},
lore: {type: Number, default: 0},
outerRim: {type: Number, default: 0},
underworld: {type: Number, default: 0},
xenology: {type: Number, default: 0}

});
mongoose.model('Character', CharacterSchema);