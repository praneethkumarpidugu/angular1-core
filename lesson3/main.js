var app = angular.module('minmax', []);

// https://minmax-server.herokuapp.com/register/'
//To Actually send a HTTPrequest we need to inject the httpService into the
//controller.
app.controller('MinMaxCtrl', function ($scope, $http) {
   $scope.formModel = {};
    $scope.onSubmit = function () {
      console.log("I'm submitted");
        console.log($scope.formModel);
        //$http.post(param1, param2)
        //param1 is the endpoint we want to send
        //param2 is the data which we want to send.
        $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
            success(function (data) {
                console.log(":)")
            }).error(function (data) {
                console.log(":(")
            });
    };
});