(function(){
  angular.module('mainApp',[])
  .controller('CINController', function($rootScope,$scope, $http){
    $scope.display = function(){
      var cin = document.getElementById("CINinput").value;
      if(!isNaN(cin)){
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
        }else{
          $scope.userError = true;
          $scope.errorResponse = "Please enter valid CIN number";
        }
    }
  });
})();
