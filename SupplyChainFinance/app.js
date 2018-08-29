supplyChain = function (cin, $scope, $http) {
    $scope.displaySCF = false;
    $scope.outputdatacin = "";
    $scope.outputdatatotal = "";
    $scope.outputdatapending = "";
    $scope.outputdatalast = "";
    $http.get("https://9pded99twc.execute-api.ap-south-1.amazonaws.com/SCF_Test_1/scfresource?cin=" + cin)
        .then(function successCallback(response) {
            $scope.displaySCF = true;
            var responsedata = response.data;
            $scope.outputdatacin = responsedata.cin;
            $scope.outputvalid = responsedata.status.toLocaleString();
            $scope.outputdatatotal = responsedata.total_discounted.toLocaleString();
            $scope.outputdatapending = responsedata.pending_payments.toLocaleString();
            $scope.outputdatalast = responsedata.last_month.toLocaleString();
            google.charts.load('current', {
                'packages': ['bar']
            });
            google.charts.setOnLoadCallback(drawStuff);

            function drawStuff() {

                var total_discounted = document.getElementById("total_discounted").value;
                console.log(total_discounted);

                var data = google.visualization.arrayToDataTable([
            ['', 'In GBP(in Thousands)', { role: 'style' } ],
            ['Discounted', responsedata.total_discounted, 'green'], // English color name
             // CSS-style declaration
            ['Paid Last Month', responsedata.last_month, '#0000ff'],
            ['Pending', responsedata.pending_payments,'#ff0000']
        ]);

                var options = {
                    legend: {
                        position: 'none'
                    },
                    width: '100%',
                    chart: {
                        title: 'Invoice Amount',
                        subtitle: ''
                    },
                    bars: 'horizontal', // Required for Material Bar Charts.
//                    series: {
//                        0: {
//                            axis: 'distance'
//                        }, // Bind series 0 to an axis named 'distance'.
//                        1: {
//                            axis: 'brightness'
//                        } // Bind series 1 to an axis named 'brightness'.
//                    },
                    axes: {
                        x: {
                            distance: {
                                label: 'Amount in GBP (in Thosuands)'
                            }, // Bottom x-axis.
                            brightness: {
                                side: 'top',
                                label: 'apparent magnitude'
                            } // Top x-axis.
                        }
                    }
                };

                var chart = new google.charts.Bar(document.getElementById('dual_x_div'));
                chart.draw(data, options);
            };
        }, function errorCallback(response) {
            console.log("GET Failed");
        });
}
