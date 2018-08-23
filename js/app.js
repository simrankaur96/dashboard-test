(function(){
  angular.module('mainApp',[])
  .config(function ($httpProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  })
  .controller('CINController', function($rootScope,$scope, $http){
    $scope.display = function(){
      var cin = document.getElementById("CINinput").value;
      if(!isNaN(cin)){
        // For Customer Info display -->
        $scope.displayContent = false;
        $scope.userError = false;
        $http.get("https://cors.io/?https://l20jgb1jch.execute-api.us-east-1.amazonaws.com/customers/info?cin="+
                  cin).then(function(response){
                    //console.log("working?");
                    if(response.data.queryStatus!="success"){
                      $rootScope.userError = true;
                      $rootScope.errorResponse = response.data.queryStatus;
                    }else{
                      if(response.data.customerType=="Corporate"){
                        $scope.type = true;
                      }else{
                        $scope.type = false;
                      }
                      $scope.displayContent = true;
                      $scope.user = response.data;
                    }
                  });

        // For Supply Chain Display -->
        //    Our POST request function
            $http.post("http://cors-anywhere.herokuapp.com/https://9pded99twc.execute-api.ap-south-1.amazonaws.com/SCF_Test_1/scfresource", '{"cin":"' + cin + '"}')
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
        }else{
          $scope.userError = true;
          $scope.errorResponse = "Please enter valid CIN number";
        }


    }
  });

})();
