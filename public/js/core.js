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
		updateUser:function(id, editData_id, editData, callback) {
			$http.put('/api/users/' + id, {'editData': editData, 'editData_id': editData_id}).success(function(data)				
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




// App.config(function($sceDelegateProvider, apiUrl) {
//   $sceDelegateProvider.resourceUrlWhitelist([
//    'self',
//    "http://www.youtube.com/embed/**"
//   ];
// });
// videos.config(function($sceDelegateProvider) {
//   $sceDelegateProvider.resourceUrlWhitelist([
//     // Allow same origin resource loads.
//     'self',
//     // Allow loading from our assets domain.  Notice the difference between * and **.
//     'http://youtube.com/**'
//   ]);

//   // The blacklist overrides the whitelist so the open redirect here is blocked.
//   $sceDelegateProvider.resourceUrlBlacklist([
//     'http://myapp.example.com/clickThru**'
//   ]);
// });


// ______________Controller____________


videos.controller('mainController', ['$scope', '$http', '$q', 'videoService', function($scope, $http, $q, videoService) {
	$scope.formData = {};
	$scope.users = [];
	// $scope.userNew  = {};
	$scope.formData.name = null;
	$scope.formData.url = null;
	$scope.formData.title = null;
	$scope.formData.desc = null;
	$scope.formData.category = [];

	$scope.editData = {};
	$scope.editData.name = null;
	$scope.editData.url = null;
	$scope.editData.title = null;
	$scope.editData.desc = null;
	$scope.editData.id = null;




	$scope.createUser = function() {
		var userDefer = $q.defer();
		// $scope.formData.url = $scope.formData.url.replace('/(?:[https?:]*\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(\w+)(?:.*)/gi');
		videoService.addUser($scope.formData, function(user){

			if(user) {
				console.log('this has come back from services: ', user);
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
		videoService.deleteUser(id, function(){});
	};

	$scope.editUser = function(id, name, url, title, desc) {
		console.log('id parameter ', id);
		$scope.editData.name = name;
		$scope.editData.url = url;
		$scope.editData.title = title;
		$scope.editData.desc = desc;
		$scope.editData.id = id;

	
		// videoService.updateUser($scope.user, function(user){
			
		// })
	};

	$scope.saveChanges = function(id) {
		for (var i = 0; i < $scope.users.length; i++) {
			if ($scope.users[i]._id === $scope.editData.id) {
				$scope.users[i].name = $scope.editData.name;
				$scope.users[i].url = $scope.editData.url;
				$scope.users[i].desc = $scope.editData.desc;
				$scope.users[i].title = $scope.editData.title;
				videoService.updateUser($scope.users[i]._id, $scope.editData.id, $scope.editData, function(){});
				
				break;
			}
		}
	};



	$scope.displayUsers = function() {
		
		videoService.listUsers( function(users) {
			$scope.users = users;
		})
	};



}]);





