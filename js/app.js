var myApp = angular.module("myApp",[]);

myApp.controller("myController",function($scope){
	console.log("In my controller");

	$scope.newUser={};
	$scope.clickedUser={};
	$scope.message = "";

	$scope.users=[
	{username: "rimon", fullName: "Manunut", email: "rimon@gmail.com"},
	{username: "shmim", fullName: "taminn", email: "shamim@gmail.com"},
	{username: "tamin", fullName: "Iqnail", email: "tamim@gmail.com"}
	];

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