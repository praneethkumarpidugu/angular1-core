var app = angular.module('codecraft', [
	'ngResource',
	'infinite-scroll'
]);

//we will add the factory $httpProvider
app.config(function ($httpProvider, $resourceProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Token 7f482b5192e232141b0a10f0d36ee4443f14dc20';
	//In the API we have, we normally have trailing slashes and to avoid we use below setting.
	$resourceProvider.defaults.stripTrailingSlashes = false;
});
app.factory('Contact', function ($resource) {
	return $resource("http://codecraftpro.com/api/samples/v1/contact/:id/");
});

app.controller('PersonDetailController', function ($scope, ContactService) {
	$scope.contacts = ContactService;
});

app.controller('PersonListController', function ($scope, ContactService) {

	$scope.search = "";
	$scope.order = "email";
	$scope.contacts = ContactService;

	$scope.loadMore = function () {
		console.log("Load More!!!");
	};

	$scope.sensitiveSearch = function (person) {
		if ($scope.search) {
			return person.name.indexOf($scope.search) == 0 ||
				person.email.indexOf($scope.search) == 0;
		}
		return true;
	};

});

app.service('ContactService', function (Contact) {

	var self =  {
		'addPerson': function (person) {
			this.persons.push(person);
		},
		'page': 1,
		'hasMore': true,
		'isLoading': false,
		'selectedPerson': null,
		'persons': [],
		'loadContacts': function () {
			Contact.get(function (data) {
				console.log(data);
				angular.forEach(data.results, function (person) {
					self.persons.push(new Contact(person));
				})
			});
		}

	};
	self.loadContacts();
	return self;

});