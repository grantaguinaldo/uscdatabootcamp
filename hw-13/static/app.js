

var dropDownData = d3
  .select("#selDataset")

var namesUrl = "/api/v1/names";
Plotly.d3.json(namesUrl, function(error, response) {
    if (error) return console.warn(error);

    for (var i = 0; i < response.length; i++){
        dropDownData
              .append('option')
              .attr('value', response[i])
              .text(response[i])
    }

});


/*
The getData() function returns the value of the dropdown list and makse an API call to the respective end point to fetch the metadata for the sample.
Once API call is made, the meta data is appended to the 'ul' element.
The function then makes another API call to obtain the data needed for the pie chart, which represents the distrubution of bacteria in the given sample.
Finally, the data is plotted and the pie chart is appended to the DOM.
*/
function getData() {

        sampleValue = document.getElementById("selDataset").value;

        var endPoint = '/api/v1/metadata/' + sampleValue.split('_')[1]

        Plotly.d3.json(endPoint, function(error, response) {
            if (error) return console.warn(error);

            d3.select('ul').append('li').text('BB Type: ' + response[0]['BBTYPE'])
            d3.select('ul').append('li').text('Ethnicity: '+ response[0]['ETHNICITY'])
            d3.select('ul').append('li').text('Gender: ' + response[0]['GENDER'])
            d3.select('ul').append('li').text('Location: ' + response[0]['LOCATION'])
            d3.select('ul').append('li').text('Sample ID: ' + response[0]['SAMPLEID'])
            d3.select('ul').append('li').text('Age: ' + response[0]['age'])

            })  //Closes Plotly.d3.json(endPoint)

        var endPointSampleData = '/api/v1/samples/' + sampleValue

        Plotly.d3.json(endPointSampleData, function(error, response) {

            if (error) return console.warn(error);

            function graphPieData(){

                var dataPie = [{
                    values: response['sample_values'],
                    labels: response['otu_ids'],
                    type: 'pie'
                }];

                var layoutPie = {
                    height: 500,
                    width: 800
                };

            Plotly.plot('pie', dataPie, layoutPie);
            }

            function graphBubbleData(){
                sizeList = []
                for (var i = 0; i < response['sample_values'].length; i++){
                    sizeList.push(100 * response['sample_values'][i])
                };

                var trace = {
                    x: response['otu_ids'],
                    y: response['sample_values'],
                    mode: 'markers',
                    marker: {
                        size: [sizeList],
                    }
                };

                var data = [trace];

                var layout = {
                      title: 'Bubble Chart of the Bacteria Distrubution (all data)',
                      showlegend: false,
                      height: 600,
                      width: 600
                    };
            Plotly.plot('bubble', data, layout);
            }

        graphPieData()
        graphBubbleData()

        })
};

/*
Current problems include the fact that when a new value is selected, the new metadata is appended to the original data.
Cannot figure out how to generate bubble chart.
https://plot.ly/javascript/bubble-charts/#marker-size-on-bubble-charts
How to select one of two <ul> from the DOM.
*/
