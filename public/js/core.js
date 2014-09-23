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
			$http.get('/api/users' + name).success(function(data)
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
		},
		updateUser:function(id, callback) {
			$http.put('/api/users/' + id).success(function(data)
				{ console.log('grab from the server:', data);
					return callback(data);
				}).error(function(data) {
					return callback(data);
				});
		},
		listUsers: function(callback) {
			$http.get('/api/users').success(function(data) 
				{ console.log('list out users:', data);
				return callback(data);
			});
		}
}});






// ______________Controller____________


videos.controller('mainController', ['$scope', '$http', '$q', 'videoService', function($scope, $http, $q, videoService) {
	$scope.formData = {};
	$scope.users = [];
	// $scope.userNew  = {};
	$scope.formData.name = null;
	$scope.formData.url = null;
	$scope.formData.title = null;
	$scope.formData.desc = null;

	$scope.editData = {};
	$scope.edit = [];
	$scope.editData.name = null;
	$scope.editData.url = null;
	$scope.editData.title = null;
	$scope.editData.desc = null;

	$scope.createUser = function() {
		var userDefer = $q.defer();
		// $scope.formData.url = $scope.formData.url.replace('/(?:[https?:]*\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(\w+)(?:.*)/gi');
		videoService.addUser($scope.formData, function(user){

			if(user) {
				console.log('this has come back from services: ', user);
				// $scope.name = {};
				$scope.users.push(user);
				console.log('did I push it here:', $scope.users)
				userDefer.resolve();
			}
			else {
				userDefer.reject('Problem creating user');
			}
		});
		return userDefer.promise;
	};


	$scope.removeUser = function(id) {
		// console.log('id parameter ', id);
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

	$scope.editUser = function(id) {
		console.log('id parameter ', id);
		// debugger;
		// if (id === 'new') {
		// 	$scope.edit = true;
		// 	$scope.incomplete = true;
		// 	$scope.name = '';
		// 	$scope.url = '';
		// }
		videoService.updateUser($scope.user, function(user){
			
		})
	};


	$scope.displayUsers = function() {
		
		videoService.listUsers( function(users) {
			$scope.users = users;
		})
	};

	// $scope.saveChanges = function(id) {
	// 	console.log($scope.userId, $scope.users);
	// 	$http({ method: 'PUT', url: 'http://localhost:6189/users/', data: $scope.users}).
	// 	                    success(function (data, status, headers, config) {
	// 	                        console.log('success', data);
		                       
	// 	                    }).
	// 	                    error(function (data, status, headers, config) {
	// 	                        console.log(data, status);
	// 	                    });

	// };


}]);





