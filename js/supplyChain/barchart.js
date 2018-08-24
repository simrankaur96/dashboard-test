google.charts.load('current', {
    'packages': ['bar']
});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {

    var total_discounted = document.getElementById("total_discounted").value;
    console.log(total_discounted);

    var data = google.visualization.arrayToDataTable([
                ['', '', {
            role: 'style'
                }],
                ['Paid', 0, 'green'], // English color name
                ['Pending', 0, 'blue'], // CSS-style declaration
                ['Last Month', 0, 'red'],
            ]);

    var options = {
        width: 300,
        chart: {
            title: ' ',
            subtitle: ''
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        series: {
            0: {
                axis: 'distance'
            }, // Bind series 0 to an axis named 'distance'.
            1: {
                axis: 'brightness'
            } // Bind series 1 to an axis named 'brightness'.
        },
        axes: {
            x: {
                distance: {
                    label: 'Amount in EUR (in Thosuands)'
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
