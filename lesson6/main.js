//since we have install dependency package we will include in the
//below dependencies array section.
var app = angular.module('minmax', [
	'jcs-autoValidate'
]);

//app hook is instantiated before directives is compiled
//Hence inside run we will use a function with default parameter
//defaultErrorMessageResolver
//defaultErrorMessagesResolver gets error messages and then
//instantiate another function with errorMessages as parameters with the
//fields tooYoung, tooOld, badUsername
app.run(function (defaultErrorMessageResolver) {
	defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
		errorMessages['tooYoung'] = 'You must be atleast {0} years old to use this site';
		errorMessages['tooOld'] = 'You must max {0} years old to use this site';
		errorMessages['badUsername'] = 'Username can only contain numbers, letters and _ ';
	});

});

app.controller('MinMaxCtrl', function ($scope, $http) {
	$scope.formModel = {};

	$scope.onSubmit = function () {

		console.log("Hey i'm submitted!");
		console.log($scope.formModel);

		$http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).success(function (data) {
			console.log(":)")
		}).error(function (data) {
			console.log(":(")
		});

	}


});