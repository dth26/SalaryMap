var GOOGLE_KEY = 'AIzaSyDsnaGf5pCVRpo5hCpcBfOq0J5Vdzj8DLY'; 

// list of cities that the user wants to search for job in
var locations = [];


var AngularApp = angular.module('salaryMap',[])

AngularApp.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

AngularApp.factory('locations', function(){
	var locations = [];

	return {
		splice: function(location){
			locations.splice(location);
		},
		push : function(location){
			locations.push(location);
		},
		data: locations
	};
});

AngularApp.controller('locations', function($scope){

	$scope.locations = [];

	$scope.getLocations = function(){
		return $scope.locations;
	}
	
	$scope.handleLocation = function($event){
		var element = $event.currentTarget
		var loc = $(element).attr('data-loc');
		var locations = $scope.locations;


		var indexOfLoc = locations.indexOf(loc);
		if(indexOfLoc > -1)
			locations.splice(indexOfLoc, 1);
		else
			locations.push(loc);

		$(element).toggleClass('glyphicon-plus glyphicon-remove');
	}
});


// attach event listeners
// $('.glyphicon-plus').on('click', handleLocation);
// $('.glyphicon-remove').on('click', handleLocation);
$('#right-panel-menu li').on('click', changeMenuTab);


function printJSON(json){
    alert(JSON.stringify(json, null, 2));
    console.log(JSON.stringify(json, null, 2));
}


// dynamically build URL GET query string
function buildURL(baseURL, params){

	var url = baseURL;
	
	for(var key in params)
	{
		// make sure property is not inherited from object protype
		if(params.hasOwnProperty(key)){
			url += '&' + key + '=' + params[key];
		}
	}

	return url;
}




function changeMenuTab(){
	var currMenuTab = '#' + $('#right-panel-menu .active').attr('data-tab') + 'Content';
	var nextMenuTab = '#' + $(this).attr('data-tab') + 'Content';

	$('#right-panel-menu .active').removeClass('active');
	$(currMenuTab).hide();

	$(this).addClass('active');
	$(nextMenuTab).show();

}

