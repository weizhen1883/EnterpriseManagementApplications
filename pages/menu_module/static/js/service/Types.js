menuapp.factory('Types', ['$http', function($http) { 
  return $http.get('http://localhost:8081/Types') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
