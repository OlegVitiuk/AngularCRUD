var myApp = angular.module("myApp",[]);

myApp.factory('DataCache', function ($cacheFactory) {
	return $cacheFactory('dataCache', {});
});

myApp.controller("myController",function($scope, DataCache,$http){

 	$scope.MyData = DataCache.get('data');

 	if(!$scope.MyData){
 		$http.get('https://jsonplaceholder.typicode.com/users').
             then(function(response) {
             	DataCache.put('data', response);
             	$scope.MyData = response.data;
             	$scope.message="Downloading has been finished!"
            });
 	}
	$scope.newUser={};
	$scope.clickedUser={};
	$scope.message = "";

	// $scope.users=[
	// {username: "rimon", fullName: "Manunut", email: "rimon@gmail.com"},
	// {username: "shmim", fullName: "taminn", email: "shamim@gmail.com"},
	// {username: "tamin", fullName: "Iqnail", email: "tamim@gmail.com"}
	// ];

	$scope.saveUser=function(){
		$scope.users.push($scope.newUser);
		$scope.newUser={};
		$scope.message="New user Added Successfully!"
	};

	$scope.selectUser= function(user){
		$scope.clickedUser = user;
	};

	$scope.updateUser=function(){
		$scope.message="User Updated Successfully!"
	};

	$scope.deleteUser=function(){
		$scope.users.splice($scope.users.indexOf($scope.clickedUser),1);
		$scope.message="User Deleted Successfully!"
	};
	$scope.clearMessage = function(){
		$scope.message = "";
	};
});