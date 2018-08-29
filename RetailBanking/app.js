retailBanking = function(cin,$scope,$http){
      var acc1;
      var responseCallback1 = function (response) {
          $scope.data1 = response.data;

          s1=$scope.data1;
          $scope.accno=s1.Items[0].ACCOUNT_NUMBER.S;
          acc1=s1.Items[0].ACCOUNT_NUMBER.S;
          $scope.bal=s1.Items[0].CURRENT_BALANCE.N;
          var s1;

      var l2='https://cwoqef7rh1.execute-api.ap-south-1.amazonaws.com/Transactions/transactions/'+acc1;
      $http.get(l2).then(responseCallback2);


      }

      var l1='https://80a0rk0mlk.execute-api.ap-south-1.amazonaws.com/Accounts/accounts/'+cin;
      $http.get(l1).then(responseCallback1);

      function compare(a,b) {
         if (a.TRANSACTION_DATE.S > b.TRANSACTION_DATE.S)
            return -1;
         if (a.TRANSACTION_DATE.S < b.TRANSACTION_DATE.S)
            return 1;
        return 0;
      }

      var responseCallback2 = function (response) {
          $scope.data2 = response.data;

           var datac = [];
           var vcredit=0;
           var vdebit=0;
           var s2=$scope.data2;

           for (var i = 0; i < s2.Items.length; i++) {
               if(s2.Items[i].TRANSACTION_TYPE.S == "CREDIT")
               vcredit =vcredit+(+s2.Items[i].TRANSACTION_AMOUNT.N);
               else if(s2.Items[i].TRANSACTION_TYPE.S == "DEBIT")
               vdebit =vdebit+(+s2.Items[i].TRANSACTION_AMOUNT.N);
           }

           $scope.data2.Items.sort(compare);
           if($scope.data2.Items.length>2)
              $scope.data2.Items=$scope.data2.Items.slice(0, 3);

           datac.push(vcredit);
           datac.push(vdebit);
           f1(datac);
           $scope.creditval=vcredit;
           $scope.debitval=vdebit;
          }
}
