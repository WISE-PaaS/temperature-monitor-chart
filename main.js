
const url = 'http://api-iot-home-demo-100.wise-paas.com/temps';
// const url = 'http://127.0.0.1:3000/temps';

// let myHeaders = new Headers({
//   // 'Access-Control-Allow-Origin': '*'
//   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
// });

// fetch(url, {
//   method: 'GET'
//   // headers: myHeaders
// })
//   .then(result => {
//     console.log(result);
//   });

let data = [];
let labels = [];

$(document).ready(() => {
  fetchAndDraw();

  setInterval(() => {
    fetchAndDraw();
  }, 3000)
});

function fetchAndDraw() {
  $.ajax({
    url: url,
    type: 'GET',
    success: (result) => {
      // console.log(result);
      result.temperatures.map(row => {
        const m = moment(row.timestamp); // convert to moment object
        // console.log(m);

        const d = {
          t: m.valueOf(),
          y: row.temperature
        };
        data.push(d);
        // data = [...data, row.temperature];
        labels.push(m);
        // labels = [...labels, row.timestamp];
      });
      // console.log(labels);
      // console.log(data);

      drawChart(data);
      labels = [];
      data = [];
    },
    error: (err) => {
      console.log(err);
    }
  });
}

let ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 500;

// Global options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = '#aaa';

function drawChart(data) {
  let massPopChart = new Chart(ctx, {
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      // labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      labels: labels,
      datasets: [{
        pointBackgroundColor: '#FFFFFA',
        pointBorderColor: '#FFFFFA',
        pointRadius: 4,
        pointHoverRadius: 8,
        fill: true,
        lineTension: 0,
        label: 'Temperature',
        data: data,
        backgroundColor: 'rgba(112, 38, 50, 0.6)', // applies to all bars
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.6)',
        //   'rgba(54, 162, 235, 0.6)',
        //   'rgba(75, 192, 192, 0.6)'
        // ],
        borderWidth: 5,
        borderColor: '#912F40',
        // hoverBorderWidth: 3,
        // hoverBorderColor: '#555'
      }],
    },
    options: {
      hover: {
        mode: false,
        animationDuration: 0
      },
      tooltips: {
        enabled: true,
        cornerRadius: 10,
        caretSize: 4,
        xPadding: 16,
        yPadding: 10,
        titleFontStyle: 'normal',
        titleFontSize: 14,
        bodyFontSize: 14,
        titleMarginBottom: 15
      },
      responsive: true,
      title: {
        display: true,
        text: 'Living Room Temperature',
        fontSize: 20
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: '#000'
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 0,
          bottom: 20,
          top: 20
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            suggestedMin: 10,
            suggestedMax: 35
          },
          gridLines: {
            // display: false ,
            color: '#aaa',
            drawTicks: false,
            lineWidth: 0.5
          },
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'all',
            displayFormats: {
              all: 'HH:mm:ss'
            }
          },
          distribution: 'series',
          ticks: {
            source: 'labels'
          },
          gridLines: {
            display: false
            // color: '#FFF'
          }
        }]
      },
      animation: {
        // easing: 'easeInSine'
        duration: 0
      }
    }
  });
}

