function f1(datac) {

    var ctx1 = $("#pie-chartcanvas-1");

    var data1 = {
        labels: ["Credit","Debit"],
        datasets: [
            {
                label: "NETVAL",
                data: datac,
                backgroundColor: [
                "#c0c0c0","#14366E"
                ],
                borderWidth: [1, 1]
            }
        ]
    };


    var options = {
        title: {
            display: true,
            position: "top",
            text: "Credit Vs Debit",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom"
        }
    };


    var chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: data1,
        options: options
    });


};
