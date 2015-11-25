

AngularApp.controller('salaryCtrl', function($scope){

	$scope.salaries = [];

	$scope.addSalary = function(companyData){

		companyData['i'] = gMarkers.length-1;
		//alert(companyData['i'] );


		$scope.$apply(function(){
			$scope.salaries.push(companyData);
		});
	}

	$scope.bounceMarker = function(i, lat, lng){

		if (gMarkers[i].getAnimation() !== null) {
			gMarkers[i].setAnimation(null);
		} else {
			gMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
	
			setCenter(lat, lng);
			setTimeout(function(){
				gMarkers[i].setAnimation(null);
			}, 3000);
		}

	}
});