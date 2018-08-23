(function(){
  angular.module('mainApp',[])
  .controller('CINController', function($scope, $http){
    $scope.display = function(){
      $scope.displayContent = false;
      $scope.userError = false;
      $http.get("https://cors.io/?https://l20jgb1jch.execute-api.us-east-1.amazonaws.com/customers/info?cin="+
                $scope.CINinput).then(function(response){
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
    }
  });
})();
