tradeFinance = function(cin,$scope,$http){

  var userDetailsSuccess = function (response) {
    var wip=0;
    var te=0;
    $scope.userDetails = response.data;
    wip=wip+$scope.userDetails.message['Work in Progress'];
    te=te+$scope.userDetails.message['Total Exposure'];
    if($scope.userDetails.message['status']=="Success")
    {
        $scope.status_customer=true;
        drawChart(wip,te);
        //$scope.nocus=false;
    }
    else
    {
        $scope.status_customer=false;
        //drawChart(wip,te);
        //$scope.nocus=true;
    }
  };
  var userDetailsError = function (error) {
      console.log("ERROR :::" + error);
      console.log(error)
  }
  
  $http.get("https://bztwi1cu97.execute-api.ap-south-1.amazonaws.com/TF/tf?CIN="+cin)
      .then(userDetailsSuccess,userDetailsError);
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
            // Draw the chart and set the chart values
function drawChart(x,y) {

         var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Work in Progress', x],
              ['Total Exposure', y],

          ]);

          // Optional; add a title and set the width and height of the chart
          //var options = {  'width': '100%', 'height': 250,is3D: true};
          var options = {
              chartArea:{top:0, bottom:30},
              'legend': { position:'none'},
              'fontSize':12,
              'width': 400,
              'height': '100%',
               'is3D' : true
          };
          // Display the chart inside the <div> element with id="piechart"
          var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          chart.draw(data, options);
      }


}
