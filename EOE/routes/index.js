var express = require('express');
var router = express.Router();
var request = require("request");
const fs = require('fs');
var species = [];


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
