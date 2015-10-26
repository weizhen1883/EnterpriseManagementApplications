menuapp.controller('MainController', ['$scope', 'Types', function($scope, Types) {
  Types.success(function(data) {
    $scope.types = data;
    $scope.cuisines = [];
    $scope.selCuisines = function(type){
    	$scope.cuisines = type.cuisines;
    }
  });
}]);