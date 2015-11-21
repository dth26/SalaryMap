

AngularApp.controller('salaryCtrl', function($scope){

	$scope.salaries = [];

	$scope.addSalary = function(companyData){

		$scope.$apply(function(){
			$scope.salaries.push(companyData);
		});
	}
});