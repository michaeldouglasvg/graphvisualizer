const ctx = document.getElementById('chartConatiner').getContext('2d');
const container = document.querySelector(".Graphbuttons");
const buttons = container.querySelectorAll(".btn");
const heading = document.querySelector(".Heading p");


let myChart;
const initialChartType = 'bar';
displayChart(initialChartType);

buttons.forEach((singleBtn) => {
  singleBtn.addEventListener("click", () => {
    container.classList.remove("pie", "bar", "line");
    const btnClass = singleBtn.classList[1];

    heading.innerHTML = btnClass.toUpperCase().concat(" GRAPH");

    if (myChart) {
      myChart.destroy();
    }

    displayChart(btnClass);
  });
});


function displayChart(chartType) {
  fetch('http://localhost/graphp/apis/apifile.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Extract the first object from the data array
      const chartData = data[0];

      // Prepare the labels and values arrays
      const labels = [];
      const values = [];

      // Loop through the properties of the chartData object
      for (const key in chartData) {
        if (chartData.hasOwnProperty(key)) {
          labels.push(key);
          values.push(Number(chartData[key]));
        }
      }

      // Call the displayChart function with the retrieved data
      myChart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of customers',
            data: values,
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'indigo']
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Customer Types'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of customers'
              }
            }
          }
        }
      });
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
}
