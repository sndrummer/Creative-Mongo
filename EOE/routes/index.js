var express = require('express');
var router = express.Router();
var request = require("request");
var mongoose = require('mongoose');
var Character = mongoose.model('Character');



//NOTE --- /characters --> /character !!!!!!!!!
//// Mongoose CRUD operations

var species = [
  {
    "speciesName": "Aqualish",
    "brawn": 3,
    "agility": 2,
    "intellect": 1,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 11,
    "strainThreshold": 8,
    "StartingExperience": 90,
    "skills": [
      "Brawl 1",
      "Resilience 1"
    ],
    "specialAbilities": [
      "Underwater Breathing - All Aqualish are capable of breathing underwater.",
      "Environmental Conditions - Aquala may remove setback imposed due to any cold or wet conditions."
    ]
  },
  {
    "speciesName": "Bothan",
    "brawn": 1,
    "agility": 2,
    "intellect": 2,
    "cunning": 3,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 10,
    "strainThreshold": 11,
    "StartingExperience": 100,
    "skills": [
      "Steetwise 1"
    ],
    "specialAbilities": [
      "Convincing Demeanor 1"
    ]
  },
  {
    "speciesName": "Chevin",
    "brawn": 3,
    "agility": 1,
    "intellect": 2,
    "cunning": 3,
    "willpower": 2,
    "presence": 1,
    "woundThreshold": 11,
    "strainThreshold": 11,
    "StartingExperience": 80,
    "skills": [
      "Negotiation 1"
    ],
    "specialAbilities": [
      "Advanced Olfaction - Chevin add bonus to Perception checks involving the sense of smell."
    ]
  },
  {
    "speciesName": "Chiss",
    "brawn": 2,
    "agility": 2,
    "intellect": 3,
    "cunning": 2,
    "willpower": 2,
    "presence": 1,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 100,
    "skills": [
      "Cool 1"
    ],
    "specialAbilities": [
      "Infravision - Chiss have adapted to be able to see in both the infrared and normal visual spectra. This enables Chiss characters to remove up to setbacks added to checks by lighting conditions."
    ]
  },
  {
    "speciesName": "Clawdite",
    "brawn": 2,
    "agility": 2,
    "intellect": 2,
    "cunning": 3,
    "willpower": 1,
    "presence": 2,
    "woundThreshold": 9,
    "strainThreshold": 9,
    "StartingExperience": 95,
    "skills": [
      "Resilience 1"
    ],
    "specialAbilities": [
      "Changeling - As an action, may suffer 3 strain and make an Average (â—†â—†) Resilience check to change appearance to match a previously-observed silhouette 1 character. Observer must make an opposed Perception vs. Deception check to detect that something is amiss."
    ]
  },
  {
    "speciesName": "Devaronian",
    "brawn": 2,
    "agility": 2,
    "intellect": 2,
    "cunning": 3,
    "willpower": 2,
    "presence": 1,
    "woundThreshold": 11,
    "strainThreshold": 10,
    "StartingExperience": 10,
    "skills": [],
    "specialAbilities": [
      "Resillient Metabolism - Devaronians add automatic â˜¼ to all Resillience checks."
    ]
  },
  {
    "speciesName": "Drall",
    "brawn": 1,
    "agility": 1,
    "intellect": 4,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 8,
    "strainThreshold": 12,
    "StartingExperience": 90,
    "skills": [
      "Education 1"
    ],
    "specialAbilities": [
      "Skilled Assistance - Drall add â–¡ when providing skilled assistance."
    ]
  },
  {
    "speciesName": "Droid",
    "brawn": 1,
    "agility": 1,
    "intellect": 1,
    "cunning": 1,
    "willpower": 1,
    "presence": 1,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 175,
    "skills": [],
    "specialAbilities": [
      "Additional Career Skills - May train in two additional career skills and one additional specialization skills",
      "Feature - Droids do not need to eat, sleep, or breath, and are unaffected by vacuum, toxins, and poisons.",
      "Inorganic - Droids do not gain benefits from bacta, stimpacks, or Medicine checks. They must be repaired with repair patches and Mechanics checks",
      "Mechanical Being - Droids cannot become Force sensitive, cannot acquire a Force Rating or Force powers, and are not affected by mind-altering Force powers.",
      "Cybernetics - Droids have a cybernetics implant cap of 6."
    ]
  },
  {
    "speciesName": "Duros",
    "brawn": 1,
    "agility": 2,
    "intellect": 3,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 11,
    "strainThreshold": 10,
    "StartingExperience": 100,
    "skills": [],
    "specialAbilities": [
      "Intuitive Navigation - Add Advantage die to all Astrogation checks."
    ]
  },
  {
    "speciesName": "Gand",
    "brawn": 2,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 3,
    "presence": 1,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 100,
    "skills": [
      "Discipline 1"
    ],
    "specialAbilities": []
  },
  {
    "speciesName": "Human",
    "brawn": 2,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 110,
    "skills": [],
    "specialAbilities": [
      "Additional Non-Career Skills - Humans start the game with one rank in two different non-career skills of their choice."
    ]
  },
  {
    "speciesName": "Corellian",
    "brawn": 2,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 110,
    "skills": [],
    "specialAbilities": [
      "May begin game with one rank in Piloting"
    ]
  },
  {
    "speciesName": "Kalleran",
    "brawn": 3,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 2,
    "presence": 1,
    "woundThreshold": 8,
    "strainThreshold": 12,
    "StartingExperience": 90,
    "skills": [
      "Streetwise 1"
    ],
    "specialAbilities": [
      "Talents: Heightened Awareness"
    ]
  },
  {
    "speciesName": "Klatooinian",
    "brawn": 2,
    "agility": 3,
    "intellect": 2,
    "cunning": 2,
    "willpower": 1,
    "presence": 2,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 100,
    "skills": [],
    "specialAbilities": [
      "Additional Non-Career Skill - Klatooninians start the game with one additional rank of one non-career skill of his choice."
    ]
  },
  {
    "speciesName": "Rodian",
    "brawn": 2,
    "agility": 3,
    "intellect": 2,
    "cunning": 2,
    "willpower": 1,
    "presence": 2,
    "woundThreshold": 10,
    "strainThreshold": 10,
    "StartingExperience": 100,
    "skills": [
      "Survival 1"
    ],
    "specialAbilities": [
      "Talents: Expert Tracker 1"
    ]
  },
  {
    "speciesName": "Selonian",
    "brawn": 2,
    "agility": 3,
    "intellect": 2,
    "cunning": 1,
    "willpower": 3,
    "presence": 1,
    "woundThreshold": 11,
    "strainThreshold": 10,
    "StartingExperience": 80,
    "skills": [
      ""
    ],
    "specialAbilities": [
      "Sees in Darkness - Selonians see in almost total darkness. Remove all setbacks added due to darkness."
    ]
  },
  {
    "speciesName": "Toydarian",
    "brawn": 1,
    "agility": 1,
    "intellect": 2,
    "cunning": 2,
    "willpower": 3,
    "presence": 3,
    "woundThreshold": 9,
    "strainThreshold": 12,
    "StartingExperience": 90,
    "skills": [],
    "specialAbilities": [
      "Hoverer - Toydarians have wings that allow them to hover slightly off the ground. When hovering, Toydarians do not have to spend additional maneuvers when navigating difficult terrain. Otherwise, their wings allow them no extra capabilities beyond those of a normal, walking character."
    ]
  },
  {
    "speciesName": "Trandoshan",
    "brawn": 3,
    "agility": 1,
    "intellect": 2,
    "cunning": 2,
    "willpower": 2,
    "presence": 2,
    "woundThreshold": 12,
    "strainThreshold": 9,
    "StartingExperience": 90,
    "skills": [
      "Perception 1"
    ],
    "specialAbilities": [
      "Wound Regeneration - Whenever a trandoshan would recover one or more wounds from natural rest or recuperation in a Bacta tank, he recovers one additional wound. Trandoshans can regrow lost limbs as well, though it usully takes at least a month before the limb is usable.",
      "May use claws when brawling - When a Trandoshan makes Brawl checks to deal damage to an opponent, he deals +1 damage and has a Critical Rating of 3."
    ]
  },
  {
    "speciesName": "Twi\u0027lek",
    "brawn": 1,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 2,
    "presence": 3,
    "woundThreshold": 10,
    "strainThreshold": 11,
    "StartingExperience": 100,
    "skills": [],
    "specialAbilities": [
      "Arid/Hot Environments - When making skill checks, Twi\u0027leks may remove â–  imposed due to arid or hot environmental conditions."
    ]
  },
  {
    "speciesName": "Weequay",
    "brawn": 3,
    "agility": 2,
    "intellect": 1,
    "cunning": 3,
    "willpower": 2,
    "presence": 1,
    "woundThreshold": 10,
    "strainThreshold": 9,
    "StartingExperience": 90,
    "skills": [],
    "specialAbilities": [
      "Communicative Pheromones - Weequay can communicate non-verbally with other Weequays up to Short Range."
    ]
  },
  {
    "speciesName": "Wookiee",
    "brawn": 3,
    "agility": 2,
    "intellect": 2,
    "cunning": 2,
    "willpower": 1,
    "presence": 2,
    "woundThreshold": 14,
    "strainThreshold": 8,
    "StartingExperience": 90,
    "skills": [
      "Brawl 1"
    ],
    "specialAbilities": [
      "Rages when Wounded - When a Wookiee has suffered any wounds, he deals +1 damage to Brawl and Melee attacks. When a Wookiee is Critically Injured, he instead deals +2 damage to Brawl and Melee attacks."
    ]
  }
]

router.get('/characters', function (req, res, next) {
  Character.find(function (err, characters) {
    if (err) {
      return next(err);
    }
    res.json(characters);
  });
});

router.post('/characters', function (req, res, next) {
  var character = new Character(req.body);
  character.save(function (err, character) {
    if (err) {
      return next(err);
    }
    res.json(character);
  });
});

router.param('character', function (req, res, next, id) {
  var query = Character.findById(id);
  query.exec(function (err, character) {
    if (err) {
      return next(err);
    }
    if (!character) {
      return next(new Error("can't find character"));
    }
    req.character = character;
    return next();
  });
});

router.get('/characters/:character', function (req, res) {
  res.json(req.character);
});

router.put('/characters/:character/upvote', function(req, res, next) {
  req.character.upvote(function(err, character){
    if (err) { return next(err); }
    res.json(character);
  });
});

router.delete('/characters/:character', function(req, res) {
  console.log("in Delete");
  req.character.remove();
  res.sendStatus(200);
});




//////////////////////////////////////////////////////////////////////////////////////////////////
///END OF MONGO DB 

function getJSON()
{
  console.log("YOU ARE GETTING THE FILE");
 
}


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});


router.get('/species', function(req, res) {
  getJSON();
  console.log("In Species");
  console.log("In Species + !!: " + req );
  res.send(species);
});

router.post('/species', function(req, res) {
  console.log(req.body);
  species.push(req.body);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 


module.exports = router;
