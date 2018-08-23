var testApp = angular.module('testApp', []);

testApp.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});


testApp.controller('testController', function ($scope, $http) {
    $scope.inputdata = "1500000012";

    //    Our POST request function
    $scope.postRequest = function () {
        $http.post("http://cors-anywhere.herokuapp.com/https://9pded99twc.execute-api.ap-south-1.amazonaws.com/SCF_Test_1/scfresource", '{"cin":"' + $scope.inputdata + '"}')
            .then(function successCallback(response) {
                //$scope.outputdata = response.text;

                var responsedata = response.data;
                $scope.outputdatacin = responsedata.cin;
                $scope.outputdatatotal = responsedata.total_discounted;
                $scope.outputdatapending = responsedata.pending_payments;
                $scope.outputdatalast = responsedata.last_month;
                console.log("Successfully POST");


                console.log(response.data);
            }, function errorCallback(response) {
                console.log("POST Failed");
            });
    };

});
