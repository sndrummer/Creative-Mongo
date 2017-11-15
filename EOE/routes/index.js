var express = require('express');
var router = express.Router();
var request = require("request");
const fs = require('fs');
var species = [];
var mongoose = require('mongoose');
var character = mongoose.model('Character');



//NOTE --- /characters --> /character !!!!!!!!!
//// Mongoose CRUD operations

router.get('/characters', function (req, res, next) {
  character.find(function (err, characters) {
    if (err) {
      return next(err);
    }
    res.json(characters);
  });
});

router.post('/characters', function (req, res, next) {
  var character = new character(req.body);
  character.save(function (err, character) {
    if (err) {
      return next(err);
    }
    res.json(character);
  });
});

router.param('character', function (req, res, next, id) {
  var query = character.findById(id);
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
fs.readFile('/home/bitnami/htdocs/Node-Creative/EOE/public/species.json', (err, data) => {  
    if (err) throw err;
    species = JSON.parse(data);
   // console.log(species);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});



router.get('/species', function(req, res) {
  console.log("In Species");
  console.log("In Species + !!: " + req );
  res.send(species);
});


var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
router.get('/politics', function(req,res) {
  console.log("In politics");
  request(politics).pipe(res);
});

router.post('/species', function(req, res) {
  console.log("In Pokemon Post");
  console.log(req.body);
  species.push(req.body);
  console.log("got Pokemon");
  res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 


module.exports = router;
