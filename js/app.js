var myApp = angular.module("myApp",[]);

myApp.factory('DataCache', function ($cacheFactory) {
	return $cacheFactory('dataCache', {});
});

myApp.controller("myController",function($scope,$http,DataCache){

 	// $scope.$emit('LOAD');
 	$scope.MyData = DataCache.get('data');

 	if(!$scope.MyData){
 		$http.get('https://jsonplaceholder.typicode.com/users').
             then(function(response) {
             	$scope.MyData = response.data;
             	DataCache.put('data', response.data);
             	// $scope.$emit('UNLOAD');
            });
 	}

	$scope.newUser={};
	$scope.clickedUser={};
	$scope.message = "";

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

	$scope.search=function (item) {
		if($scope.searchText == undefined){
			return true;
		}
		else{
			if(item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
				item.username.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
				item.email.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1){
				return true;
			}
		}
		return false;
	};

	// $scope.$on('LOAD',function(){
	// 	$scope.loading = true;
	// })
	// $scope.$on('UNLOAD',function(){
	// 	$scope.loading = false;
	// })


	$scope.sortColumn = "name";
	$scope.reverseSort = false;
	$scope.sortData = function(column){
		$scope.reverseSort= ($scope.sortColumn == column) ? 
		!$scope.reverseSort : false;
		$scope.sortColumn = column;
	} 

	$scope.getSortClass = function(column){
		if($scope.sortColumn==column){
			return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
		}
	}

$( document ).ready(function() {
     $scope.message="All users have been successfully downloaded!";
});

});
