var myApp = angular.module("myApp",[]);

myApp.factory('DataCache', function ($cacheFactory) {
	return $cacheFactory('dataCache', {});
});

myApp.controller("myController",function($scope,$http,DataCache){

 	$scope.$emit('LOAD');
 	$scope.MyData = DataCache.get('data');

 	if(!$scope.MyData){
 		$http.get('https://jsonplaceholder.typicode.com/users').
             then(function(response) {
             	$scope.MyData = response.data;
             	DataCache.put('data', response.data);
             	$scope.$emit('UNLOAD');
            });
 	}

	$scope.newUser={};
	$scope.clickedUser={};
	$scope.message = "";
	$scope.distance = 0;
	$scope.myLocation = { lat: 50.448140, lng: 30.452775 }

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

	$scope.$on('LOAD',function(){
		$scope.loading = true;
	})
	$scope.$on('UNLOAD',function(){
		$scope.loading = false;
	})


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
		return "";
	}

	$scope.getLocation = function(){
		return $scope.myLocation;
	}

	$scope.haversineDistance=function(a, b){

		var atan2 = Math.atan2
		var cos = Math.cos
		var sin = Math.sin
		var sqrt = Math.sqrt
		var PI = Math.PI

		 // (mean) radius of Earth (meters)
		var R = 6378137

		function squared (x) { return x * x }
		function toRad (x) { return x * PI / 180.0 }


		var aLat = a.latitude || a.lat
		 var bLat = b.latitude || b.lat
		 var aLng = a.longitude || a.lng
		 var bLng = b.longitude || b.lng

		 var dLat = toRad(bLat - aLat)
		 var dLon = toRad(bLng - aLng)

		  var f = squared(sin(dLat / 2.0)) + cos(toRad(aLat)) * cos(toRad(bLat)) * squared(sin(dLon / 2.0))
		  var c = 2 * atan2(sqrt(f), sqrt(1 - f))

		  return R * c //get distance in meters!
	}

$( document ).ready(function() {
     $scope.message="All users have been successfully downloaded!";
});

});

myApp.directive("getDistance",function(){
	return function(scope, element ,attributes){

		var atrValue=attributes["getDistance"];
		var data = scope[atrValue];
		var distanceInKilometres = scope.haversineDistance(scope.getLocation(),data.address.geo)/1000;

		scope.distance = parseFloat(distanceInKilometres.toFixed(2))
	}
});
