//we are storing the angular module in a variable called app
//in module param1: name of the module, param2: list of dependencies.
var app = angular.module('minmax', []);

//controller
//param1: name of the controller
//param2: function and first param of function is a special variable called $scope
//         anything we add to scope variable we can actually databind to in the HTML.
//          And you could actually access from HTML
app.controller('MinMaxCtrl', function ($scope) {
    $scope.formModel = {};//After you declare here we can bind this in html.
    $scope.onSubmit = function () {
        console.log("Hey I'm submitted!");
        //we could also actually log our actual formModel
        console.log($scope.formModel);

    };
});