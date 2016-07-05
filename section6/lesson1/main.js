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
		$scope.contacts.loadMore();
	};

	$scope.$watch('search', function(newVal, oldVal) {
		console.log(newVal);
	})

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
			if (self.hasMore && !self.isLoading) {
				self.isLoading = true;
				var params = {
					'page': self.page
				};
				Contact.get(params, function (data) {
					console.log(data);
					angular.forEach(data.results, function (person) {
						self.persons.push(new Contact(person));
					});
					if (!data.next) {
						self.hasMore = false;
					}
					self.isLoading = false;
				});
			}


		},
		'loadMore': function () {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadContacts();
			}
		}

	};
	self.loadContacts();
	return self;

});