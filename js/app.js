var myApp = angular.module("myApp",[]);

myApp.controller("myController",function($scope){
	console.log("In my controller");

	$scope.users=[
	{username: "rimon", fullName: "Manunut", email: "rimon@gmail.com"},
	{username: "shmim", fullName: "taminn", email: "shamim@gmail.com"},
	{username: "tamin", fullName: "Iqnail", email: "tamim@gmail.com"}
	];
});