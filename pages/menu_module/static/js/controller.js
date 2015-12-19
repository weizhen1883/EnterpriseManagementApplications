menuapp.controller('MainController', ['$scope', '$http', function($scope, $http) {
  // Types.success(function(data) {
  //   $scope.types = data;
 //  	$scope.typeData = {};

	// $http.get('/Types').success(
	// 	function (res){
 //    		$scope.types = res; 		
 //  		}).error (
	// 	function (res){
 //    		alert("data not found");
 // 		});

 //    $scope.cuisines = [];

 //    $scope.selCuisines = function(type){
 //    	$scope.cuisines = type.cuisines;
 //    };

 //    $scope.addType = function (){
 //    	$http({
 //    		method:'POST',
 //    		url:'menu/add_type',
 //    		data:$scope.typeData
 //    	}).success(function(res) {
			
 //   		}).error(function (err){
 //    		alert(err);
 // 		})};

}]);

// var addNewType =  menuapp.directive("addType", function($compile){
// 	return function(scope, element){
// 		angular.element(document.getElementById('space-for-type'))
// 		.append($compile('<li ng-click="selCuisines(type)"><a href="#">'{{type.Name}}'</a></li>')
// 	}
// });