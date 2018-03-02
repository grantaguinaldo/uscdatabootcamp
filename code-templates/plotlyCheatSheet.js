var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
                "Brown", "Brown", "Brown", "Green", "Green",
                "Green", "Green", "Green", "Blue", "Blue",
                "Blue", "Blue", "Blue", "Blue"];
var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
                  25.7, 24.5, 26.4, 24.2, 28, 26.9,
                  29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// Create the Trace
var trace1 = {

    x: eyeColor,
    y: eyeFlicker,
    type: 'bar'
};

// Create the data array for our plot
var data = [trace1];

// Define our plot layout
var layout = {
    title: 'barchart',
    xaxis: {title: 'Eye Color'},
    yaxis: {title: 'Flicker Freq'}
};

// Plot the chart to a div tag with id "bar-plot"
//Format is: Plotly.newPlot(<css class or id>, <data array>, <plot layout>);
Plotly.newPlot('bar-plot', data, layout); 