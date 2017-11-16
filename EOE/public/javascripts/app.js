var app = window.angular.module('app', [])
var mySpec = "";
//var allSpecies = [];
//////  //////////////
var allSpecies = [];


function addObj(obj) {
  allSpecies[allSpecies.length] = obj;
}

updateImage = function(){
  var imgURL = $("#picURL").val();
  $("#han-solo").attr("src",imgURL);
}





app.factory('speciesFetcher', speciesFetcher)
//app.factory('characterFectch', characterFetcher)

$(document).ready(function () {

  $('#contactlink').click = function () {
    $(document).scrollTo('#contact');
  }

});



app.controller('mainCtrl', mainCtrl);

function speciesFetcher($http) {

  var API_ROOT = 'species'
  var selection = mySpec;
  console.log("Current Selection: " + selection);
  if (selection !== "") {
    API_ROOT += selection;
  }
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }
  //XP
}

function mainCtrl($scope, speciesFetcher, $http) {

  $scope.species = [];
  $scope.characters = [];
  $scope.StartXP = 0;
  $scope.EarnedXP = 0;
  $scope.TotalXP = 0;
  $scope.UsedXP = 0;
  $scope.UnusedXP = 0;
  $scope.specialAbilites = "";
  $scope.species_selection = "";
  //$scope.selectedChar = "";


  //$scope.species_selection = ;


  $scope.characterName = "";

  $scope.infoText = "CLICK LOAD CHARACTER TO GET A LIST OF CHARACTERS";


  $(document).ready(function () {
    $("#characterSelector")[0].selectedIndex = 1
    console.log("ready!");

  });

  $scope.newChar = function () {
    if ($(hideMe).is(":visible") && $('#species').find(":selected").text() != "") {
      location.reload();
    }
    $('#hideMe').show();
   // $scope.reset();
    
    $("#text-name").click();
    var scope = angular.element("#species").scope();
    scope.species_selection = "";
   
    scope.changeRace();
    $scope.getChars();
    
  }

  $scope.reset = function(){
    $("#han-solo").attr("src","han-solo.png");
    
    
    console.log("Character NAME: " + $scope.characterName);
    $scope.characterName = "";
    //$scope.$apply();
    console.log("Character NAME AFTER: " + $scope.characterName);
    $('#text-name').val("");
    

    angular.element(jQuery('#name')).triggerHandler('input'); 
    $('#name').val("");
    $('#career').val("");
    $('#specTrees').val("");
    $("#species").prop("selectedIndex", -1);
    $scope.update();
  }


  $scope.showOptions = function () {
    console.log("showing options: ");


  }

  $scope.getChars = function () {
    $('#hideMe').show();
    //$scope.selectedChar =  $("#characterSelector")[0].selectedIndex = 1;
    console.log("Getting Chars ");
    $("#characterSelector").css("display", "block");
    $scope.getAll();
    $scope.infoText = "Select a Character from the list";
    //$scope.selectedChar =  $("#characterSelector")[0].selectedIndex = 1;

    //text-name
    // $("#characterSelector")[0].selectedIndex = 1;

    //$scope.selectedChar = $("#characterSelector")[0].selectedIndex = 1

    $('html, body').animate({
      scrollTop: $("#characterSelector").offset().bottom
    }, 0);

    //$("#characterSelector").change();
    //$("#characterSelector").val($("#characterSelector option:first").val());
    //$scope.selectedChar =  $("#characterSelector")[0].selectedIndex = 1;


  }




  $scope.getAll = function () {
    return $http.get('/characters').success(function (data) {
      angular.copy(data, $scope.characters);
    });

  };




  $scope.loadChar = function () {
    console.log("in loadChar!!!!!!");
   
    //var select = jQuery("select[id='species']");
    //select.change();

    var myCharacter = JSON.parse($scope.selectedChar);
    $scope.characterName= myCharacter.name;
    console.log("species = " + myCharacter.species);
    $('#career').val(myCharacter.career);
    $('#specTrees').val(myCharacter.specialization);
    var myImageURL = myCharacter.imgURL;
    $("#han-solo").attr("src",myImageURL);
   
    var myImageURL = $("#han-solo").attr("src");
    /**
     * 
     * 
     *   var myCareer = $('#career').val();
    var mySpecTrees = $('#specTrees').val();
   
    var myImageURL = $("#han-solo").attr("src");
     * name: $scope.characterName,
      species: species_selection,
      career: myCareer,
      imgURL: myImageURL,
      specialization: mySpecTrees
     */
    
    $('#species option:contains('+ myCharacter.species + ')').prop('selected', true);
   
    var scope = angular.element("#species").scope();
    scope.species_selection = myCharacter.species;
    scope.changeRace();
   
  //  $("#species").trigger("change");
    //$("#species").val(myCharacter.species);


    //$("#text-name").click();
    //$scope.species_selection = 
    //HERE:: $('.selDiv option:contains("Selection 1")')
  };

$scope.update = function(){
  if ($scope.selectedChar) {
    var myCharacter = JSON.parse($scope.selectedChar);
    $scope.characterName= myCharacter.name;
    console.log("species = " + myCharacter.species);
    
    $('#species option:contains('+ myCharacter.species + ')').prop('selected', true);
  
    var scope = angular.element("#species").scope();
    scope.species_selection = myCharacter.species;
    scope.changeRace();
  }
  else{
    var scope = angular.element("#species").scope();
    scope.species_selection = "";
    scope.changeRace();
  }

}



  $scope.saveChar = function () {
    var species_selection = $('#species').find(":selected").text();
    console.log("SELECTED: " + species_selection);
    if (species_selection === '' || $scope.characterName === '') {
      console.log("INVALID CHARACTER CHOOSE A NAME AND RACE");
      return;
    }
    var myCareer = $('#career').val();
    var mySpecTrees = $('#specTrees').val();
   
    var myImageURL = $("#han-solo").attr("src");
    console.log("!!!!!!!!!!!!IMAGE URL: " + myImageURL)
    console.log("In saveChar with " + $scope.characterName + " who is a " + species_selection);
    $scope.create({
      name: $scope.characterName,
      species: species_selection,
      career: myCareer,
      imgURL: myImageURL,
      specialization: mySpecTrees
    });
  }


  
  $scope.deleteChar = function(){
    var myCharacter = JSON.parse($scope.selectedChar);
    console.log("DELETING: \n" + myCharacter);
    if (myCharacter) {
      $http.delete('/characters/' + myCharacter._id )
      .success(function(data){
        console.log("delete worked");
      });
      location.reload();
    }
    
    //$scope.update();
  }



  $scope.create = function (character) {
    return $http.post('/characters', character).success(function (data) {
      $scope.characters.push(data);
    });
  };

  speciesFetcher.get()
    .then(function (data) {
      $scope.species = data;
      //console.log($scope.species[2].speciesName);

      var arr = Object.values($scope.species);
      //console.log("arr SpeciesName" + arr[2].speciesName);
      //var arr= JSON.parse(data);
      i = 0;
      for (var spec in arr) {
        //var obj = JSON.parse(spec);
        addObj(spec);
        allSpecies[i] = arr[i];
        //console.log("ARR: " + arr[i].speciesName);
        //console.log("ALL_SPECIES: " + allSpecies[i].speciesName);
        i++;
      }
      //this.allSpecies = $scope.species;
      // console.log("Scope.species is " + allSpecies);
      //return $scope.species;
    });

}

//////////////////////////////////

app.directive('xpDirective', function () {


  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    template: '<select class="form-control" id="species" ng-model="model" ng-options="option.name as option.value group by option.type for option in options"></select>',
    controller: function ($scope) {

    }
  };


});

/**
 * 
app.directive('charList', function(){
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    //<select class="form-control" id="characterSelector" ng-model="selectedChar" ng-change="loadChar()">
    template: '<select class="form-control" id="characterSelector" ng-change="loadChar()" ng-model="selectedChar" ng-options="character as character.name for character in characters"></select>',
    controller: function ($scope) {
      console.log("WHAT THE FFFFFF!!!");
     
    }
  }
})
 */

app.directive('speciesList', function () {
  //var mySpec = $scope.species;
  //console.log(mySpec);
  return {
    restrict: 'E',
    scope: {
      model: '=',
    },
    template: '<select class="form-control" id="species" ng-change="changeRace()" ng-model="species_selection" ng-options="option.name as option.value group by option.type for option in options"></select>',
    controller: function ($scope) {
      $scope.options = [{
          name: '',
          value: '',
          type: ""
        },
        {
          name: 'Aqualish',
          value: 'Aqualish',
          type: ""
        },
        {
          name: 'Bothan',
          value: 'Bothan',
          type: ""
        },
        {
          name: 'Chevin',
          value: 'Chevin',
          type: ""
        },
        {
          name: 'Chiss',
          value: 'Chiss',
          type: ""
        },
        {
          name: 'Clawdite',
          value: 'Clawdite',
          type: ""
        },
        {
          name: 'Devaronian',
          value: 'Devaronian',
          type: ""
        },
        {
          name: 'Drall',
          value: 'Drall',
          type: ""
        },
        {
          name: 'Droid',
          value: 'Droid',
          type: ""
        },
        {
          name: 'Duros',
          value: 'Duros',
          type: ""
        },
        {
          name: 'Gand',
          value: 'Gand',
          type: ""
        },
        {
          name: 'Human',
          value: 'Human',
          type: "Human"
        },
        {
          name: 'Corellian',
          value: 'Corellian',
          type: "Human"
        },
        {
          name: 'Kalleran',
          value: 'Kalleran',
          type: ""
        },
        {
          name: 'Klatooinian',
          value: 'Klatooinian',
          type: ""
        },
        {
          name: 'Rodian',
          value: 'Rodian',
          type: ""
        },
        {
          name: 'Selonian',
          value: 'Selonian',
          type: ""
        },
        {
          name: 'Toydarian',
          value: 'Toydarian',
          type: ""
        },
        {
          name: 'Trandoshan',
          value: 'Trandoshan',
          type: ""
        },
        {
          name: 'Twi\'lek',
          value: 'Twi\'lek',
          type: ""
        },
        {
          name: 'Weequay',
          value: 'Weequay',
          type: ""
        },
        {
          name: 'Wookiee',
          value: 'Wookiee',
          type: ""
        }
      ];

      $scope.changeRace = function () {
        console.log("Function called");
        mySpec = $scope.species_selection;
        console.log(mySpec);

        updateValues($scope, allSpecies);

        //console.log(formData);
        // function updateValues(mySpec){
        //  if (mySpec) {
        //   makeQuery(mySpec);
        // }
        // }

      };

      function updateValues($scope, allSpecies) {
        //console.log("Species selection: " + $scope.species_selection);
        // console.log("Scope.species " + allSpecies);
        //console.log("ALL_SPECIES AGAIN!!!: " + allSpecies[2].speciesName);
        //var allSpecies = mainCtrl($scope, speciesFetcher, $http);
        if ($scope.species_selection == "") {
          //console.log("We HAVE A WINNER!!!: " + allSpecies[i].speciesName);
         // console.log("startXP:" + allSpecies[i].StartingExperience);
          $('#StartXP').text('Start XP: 0');
          $('#soak-val').attr('value', 0);
          // $('#colorpickerField1').attr('value', '#000000')
          $('#wounds-threshold').attr('value', 0);
          $('#strain-threshold').attr('value', 0);

          //General Skills
          $('#Athletics').attr('value', 0);
          $('#Athletics').attr('value', 0);

          $('#brawn').text('Brawn: 0' );
          $('#agility').text('Agility: 0');
          $('#intellect').text('Intellect: 0');
          $('#cunning').text('Cunning: 0' );
          $('#willpower').text('Willpower: 0' );
          $('#presence').text('Presence: 0' );
        }
        else{
          for (var i = 0; i < allSpecies.length; i++) {
            if (allSpecies[i].speciesName == $scope.species_selection) {
              console.log("We HAVE A WINNER!!!: " + allSpecies[i].speciesName);
              console.log("startXP:" + allSpecies[i].StartingExperience);
              $('#StartXP').text('Start XP: ' + allSpecies[i].StartingExperience);
              $('#soak-val').attr('value', allSpecies[i].brawn);
              // $('#colorpickerField1').attr('value', '#000000')
              $('#wounds-threshold').attr('value', allSpecies[i].woundThreshold);
              $('#strain-threshold').attr('value', allSpecies[i].strainThreshold);
  
              //General Skills
              $('#Athletics').attr('value', allSpecies[i].brawn);
              $('#Athletics').attr('value', allSpecies[i].brawn);
  
              $('#brawn').text('Brawn: ' + allSpecies[i].brawn);
              $('#agility').text('Agility: ' + allSpecies[i].agility);
              $('#intellect').text('Intellect: ' + allSpecies[i].intellect);
              $('#cunning').text('Cunning: ' + allSpecies[i].cunning);
              $('#willpower').text('Willpower: ' + allSpecies[i].willpower);
              $('#presence').text('Presence: ' + allSpecies[i].presence);
  
            }
          }
        }
      }
    }
  };
});