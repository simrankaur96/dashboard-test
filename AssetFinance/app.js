function drawChart() {
	var data = new google.visualization.arrayToDataTable([
		['Asset Type', 'Amount\nLeased', 'Amount\nPending'],
		['Vehicles', v1, v2],
		['Healthcare\nEquipment', h1, h2],
		['Helicopters\nand Jets', j1, j2]
		]);

	var options = {
		width: '100%',
		height: '250',
		legend: { position: 'none' },
		colors:['#3366cc', '#dc3912'],
		bars: 'horizontal',
		hAxis: {
			gridlines: { color: '#333', count: 6 }
		},
	//	bar: { groupWidth: "61.8%" }
	};

	var chart = new google.charts.Bar(document.getElementById('barchart_material'));
	chart.draw(data, options);
}

assetFinance = function(cin,$scope,$http){
  $scope.displayAF = false;
  $scope.resp = true;
  var successCallback = function (response) {
    $scope.displayAF = true;
    if (response.data.length > 0) {
      $scope.resp = false;
      // console.log(response.data);
      v1=0;
      v2=0;
      h1=0;
      h2=0;
      j1=0;
      j2=0;
      for(i=0;i<response.data.length;i++)
      {
        if (response.data[i].AssetType == "Vehicles") {
          v1 += response.data[i].AmtLeased;
          v2 += response.data[i].AmtPending;
        }
        if (response.data[i].AssetType == "Healthcare Equipment") {
          h1 += response.data[i].AmtLeased;
          h2 += response.data[i].AmtPending;
        }
        if (response.data[i].AssetType == "Helicopters and Jets") {
          j1 += response.data[i].AmtLeased;
          j2 += response.data[i].AmtPending;
        }
      }
      $scope.totleased = v1 + h1 + j1;
      $scope.totpend = v2 + h2 + j2;
      google.charts.load('current', {'packages':['bar']});
			google.visualization.events.addListener('barchart_material', 'ready', function () {
      	container.style.display = null;
    	});
      google.charts.setOnLoadCallback(drawChart);
    } else {
      $scope.resp = true;
      document.getElementById('barchart_material').innerHTML = "No Records Found";
    }
  }

  var errorCallback = function (error) {
    console.log(error);
  }

  $http.get("https://30iy1f2ruh.execute-api.ap-south-1.amazonaws.com/latest/page/?cin=" + cin)
      .then(successCallback, errorCallback);

}
