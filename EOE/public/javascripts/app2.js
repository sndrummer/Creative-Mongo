
function newChar() {
    location.reload();
}

//load character
function loadChar() {
    //
    $scope.getAll = function() {
        return $http.get('/characters').success(function(data){
          angular.copy(data, $scope.characters);
        });
      };
      $scope.getAll();
}
