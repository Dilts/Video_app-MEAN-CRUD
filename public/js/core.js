var videos = angular.module( "videos", [] );

// ___________Services______________




videos.factory('videoService', function ($http) {
	return {	
		addUser: function(info, callback){
			console.log(info)
			$http.post('/api/users', info).success(function(data) 
				{ console.log('back from the server:', data);
					return callback(data);
				}).error(function(data) {
					return callback(data);
				});
		},
		getUser: function(name, callback) {
			$http.get('/api/users/' + name).success(function(data)
				{ return callback(data);
				}).error(function(data) {
					return callback(data);
				});
		},
		deleteUser: function(id, callback) {
			$http.delete('/api/users/' + id).success(function(data)
				{ return callback(data);
				}).error(function(data) {
					return callback(data)
				});
		}
	}
});





// ______________Controller____________


videos.controller('mainController', ['$scope', '$http', '$q', 'videoService', function($scope, $http, $q, videoService) {
	$scope.formData = {};
	$scope.users = [];
	// $scope.userNew  = {};
	$scope.formData.name = null;
	$scope.formData.url = null;
	$scope.formData.title = null;
	$scope.formData.desc = null;


	$scope.createUser = function() {
		var userDefer = $q.defer();
		$scope.formData.url = $scope.formData.url.replace('regex from refactoru')
		videoService.addUser($scope.formData, function(user){
			if(user) {
				console.log('this has come back from services: ', user);
				// $scope.name = {};
				$scope.users.push(user);
				console.log('did we push here:', $scope.users)
				userDefer.resolve();
			}
			else {
				userDefer.reject('Problem creating user');
			}
		});
		return userDefer.promise;
	};

	$scope.saveChanges = function() {
		console.log($scope.userId, $scope.selectedUser);
		$http({ method: 'PUT', url: 'http://localhost:6189/users/', data: $scope.selectedUser}).
		                    success(function (data, status, headers, config) {
		                        console.log('sucess', data);
		                       
		                    }).
		                    error(function (data, status, headers, config) {
		                        console.log(data, status);
		                    });

	};

	$scope.removeUser = function(id) {
		console.log('id parameter ', id);
		console.log('users before splice: ', $scope.users)
		for (var i = 0; i < $scope.users.length; i++) {
			if ($scope.users[i]._id === id) {
				$scope.users.splice(i,1);
				console.log('users after splice ', $scope.users);
				break;
			}
		};
		videoService.deleteUser(id, function(){

		});
	};

}]);





