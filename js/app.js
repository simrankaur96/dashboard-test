(function(){
  angular.module('mainApp',[])

  .config(function ($httpProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  })

  .controller('CINController', function($scope, $http){
    $scope.display = function(){
      var cin = document.getElementById("CINinput").value;
      if(!isNaN(cin)){
        // For Customer Info display -->
        $scope.displayContent = false;
        $scope.userError = false;
      var endPoint = "https://l20jgb1jch.execute-api.us-east-1.amazonaws.com/customers/info?cin=";
      var theUrl   = endPoint + cin;
        $http.get(theUrl).then(function(response){
                    //console.log("working?");
                    if(response.data.queryStatus!="success"){
                      $scope.userError = true;
                      $scope.errorResponse = response.data.queryStatus;
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
              supplyChain(cin, $scope, $http);

        //Trade Finance Logic -->
              tradeFinance(cin,$scope,$http);

        //Retail Banking logic -->
              retailBanking(cin,$scope,$http);

        //Asset Finance Logic -->
              assetFinance(cin,$scope,$http);

        }else{
          $scope.userError = true;
          $scope.errorResponse = "Please enter valid CIN number";
        }


    }
  });

})();
