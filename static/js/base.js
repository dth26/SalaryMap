var GOOGLE_KEY = 'AIzaSyDsnaGf5pCVRpo5hCpcBfOq0J5Vdzj8DLY'; 

// list of cities that the user wants to search for job in
var locations = [];

// keep a list of references to the markers
var gMarkers = [];


var AngularApp = angular.module('salaryMap',[]);
AngularApp.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);





var allLocations = [{
	'Baltimore': {'state':'MD', 'city':'Baltimore','lat':39.2846225, 'lng':-76.7605701, 'selected':false},
	'New York City': {'state':'', 'city':'New York','lat': 40.7029741, 'lng':-74.2598655, 'selected':false},
	'Houston': {'state':'TX','city':'Houston','lat': 29.8168824, 'lng':-95.6814854, 'selected':false},
	// 'Herndon': {'state':'VA','city':'Herndon','lat': 38.9709672, 'lng':-77.4069342, 'selected':false },
	'Boston': {'state':'MA','city':'Boston','lat': 42.3132882, 'lng':-71.1972408, 'selected':false},
	'Philadelphia': {'state':'PA', 'city':'Philadelphia','lat': 39.9496103, 'lng':-75.1502821, 'selected':false},
	'Pittsburgh': {'state':'PA','city':'Pittsburgh','lat': 40.4624764, 'lng': -79.9300166, 'selected':false},
	'Washington DC': {'state':'','city':'Washington DC', 'lat': 38.8976763, 'lng': -77.0365298, 'selected':false},
	'San Francisco': {'state':'CA','city':'San Francisco','lat': 37.7675707, 'lng': -122.430643, 'selected':false}
}];



$(document).ready(function(){
	var locationsElement = document.getElementById('filterContent');
	var locationsCtrl = angular.element(locationsElement).scope();
	locationsCtrl.loadAllLocationsToScreen();
});



AngularApp.controller('locations', function($scope){

	$scope.userLocations = [];

	$scope.getLocations = function(){
		return $scope.locations;
	}

	// called in document.ready() in this file
	// load all possible cities to filter screen
	$scope.loadAllLocationsToScreen = function(){

		$scope.locations = [];

		for(var i=0;i<allLocations.length; i++){
		//	printJSON(locs[i]));

			$scope.$apply(function(){
	           $scope.locations.push(allLocations[i]);
	        });
		}
        

        //printJSON($scope.locations);

	}

	// load user selected locations to drop down in salary page
	$scope.loadUserSelectedLocations = function(city){

		$scope.$apply(function(){
			//city 
			$scope.userLocations.push(city);
		});

	}
	
	$scope.handleLocation = function($event){
		var element = $event.currentTarget;
		var loc = $(element).attr('data-loc');
	
		//alert(loc);

		var indexOfLoc = locations.indexOf(loc);
		if(indexOfLoc > -1)
			locations.splice(indexOfLoc, 1);
		else
			locations.push(loc);

		//alert(locations);

		$(element).toggleClass('glyphicon-plus glyphicon-remove');
	}
});




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


// attach event listener
$('#right-panel-menu li').on('click', changeMenuTab);

function changeMenuTab(){
	var currMenuTab = '#' + $('#right-panel-menu .active').attr('data-tab') + 'Content';
	var nextMenuTab = '#' + $(this).attr('data-tab') + 'Content';

	$('#right-panel-menu .active').removeClass('active');
	$(currMenuTab).hide();

	$(this).addClass('active');
	$(nextMenuTab).show();

}
