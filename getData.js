var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				// document.getElementById("demo").innerHTML = xhttp.responseText;
				var obj = JSON.parse(xhttp.responseText);
				if(obj.length>0) {
					v1=0;
					v2=0;
					h1=0;
					h2=0;
					j1=0;
					j2=0;
					for(i=0;i<obj.length;i++)
					{
						if (obj[i].AssetType == "Vehicles") {
							v1 += obj[i].AmtLeased;
							v2 += obj[i].AmtPending;
						}
						if (obj[i].AssetType == "Healthcare Equipment") {
							h1 += obj[i].AmtLeased;
							h2 += obj[i].AmtPending;
						}
						if (obj[i].AssetType == "Helicopters and Jets") {
							j1 += obj[i].AmtLeased;
							j2 += obj[i].AmtPending;
						}
					}
					google.charts.load('current', {'packages':['bar']});
					google.charts.setOnLoadCallback(drawChart);
				} else {
					document.getElementById('barchart_material').innerHTML = "No Records Found";
					document.getElementById('linea').innerHTML = "";
					document.getElementById('lineb').innerHTML = "";
					document.getElementById('linec').innerHTML = "";
				}
			}
		};

		function init() {
			cid = document.getElementById("CINinput").value;
			xhttp.open("GET", "https://30iy1f2ruh.execute-api.ap-south-1.amazonaws.com/latest/page/?cin=" + cid, true);
			xhttp.send();
		}

		function drawChart() {
			var data = new google.visualization.arrayToDataTable([
				['Asset Type', 'Amount\nLeased', 'Amount\nPending'],
				['Vehicles', v1, v2],
				['Healthcare\nEquipment', h1, h2],
				['Helicopters\nand Jets', j1, j2]
				]);

			var options = {
				width: '100%',
				legend: { position: 'none' },
				colors:['#3366cc', '#dc3912'],
				bars: 'horizontal',
				hAxis: {
					gridlines: { color: '#333', count: 6 }
				},
				bar: { groupWidth: "61.8%" }
			};

			var chart = new google.charts.Bar(document.getElementById('barchart_material'));
			chart.draw(data, options);
			document.getElementById('linea').innerHTML = "GBP(£)";
			document.getElementById('lineb').innerHTML = "<img src='1.png' width='18' height='18' style='vertical-align:middle'> Amount Leased &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='2.png' width='18' height='18' style='vertical-align:middle'> Amount Pending";
			document.getElementById('linec').innerHTML = "<b> Total Amount Leased: " + (v1+h1+j1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Amount Pending: " + (v2+h2+j2) + "</b>";
		}
