

AngularApp.controller('salaryCtrl', function($scope){

	$scope.salaries = [];

	$scope.addSalary = function(companyData){

		companyData['i'] = gMarkers.length-1;
		alert(companyData['i'] );


		$scope.$apply(function(){
			$scope.salaries.push(companyData);
		});
	}

	$scope.bounceMarker = function(i){
	//		alert(i);

	//	alert(gMarkers.length);

		if (gMarkers[i].getAnimation() !== null) {
			gMarkers[i].setAnimation(null);
		} else {
			gMarkers[i].setAnimation(google.maps.Animation.BOUNCE);

			setTimeout(function(){
				gMarkers[i].setAnimation(null);
			}, 4000);
		}

	}
});