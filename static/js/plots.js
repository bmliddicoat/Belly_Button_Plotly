function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  //2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then(function (data) {
      console.log(data);
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;


      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var filterSamples = samples.filter(sampleObject => sampleObject.id == sample);
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var metaDatafilter = data.metadata.filter(sampleObject => sampleObject.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var result = filterSamples[0];
      // 2. Create a variable that holds the first sample in the metadata array.
      var metaArray = metaDatafilter[0]
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otuIdS = result.otu_ids;

      var otuLabels = result.otu_labels;

      var sampleValues = result.sample_values;

      // 3. Create a variable that holds the washing frequency.
      var washFreq = metaDatafilter[0].wfreq

      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      var yticks = otuIdS.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

      // 8. Create the trace for the bar chart. 
      var barData = [
        {
        type: 'bar',
        x: sampleValues.slice(0,10).reverse,
        y: yticks,
        label: otuLabels,
        orientation: 'h'
        }
      ];
      
      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 bacteria Cultures Found",
        
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);
   
      // 1. Create the trace for the bubble chart.
   var bubbleData = [
     {  
       x: otuIdS,
       y: sampleValues,
       text: otuLabels,
       mode: "markers",
       marker: {
         color: otuIdS,
         size: sampleValues
        }

      }
   ];

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    margin: {t: 0},
    xaxis: {title: "OTU ID"},
    hovermode: "closet"
  };

  // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          bar: {color: 'black'},
          axis: { range: [null, 9] },
          steps: [
              { range: [0, 2], color: 'crimson' },
              {range: [2, 4], color: 'gold'},
              {range: [4,6], color: 'yellow' },
              {range: [6, 8], color: 'greenyellow' },
              {range: [8, 10], color: 'green'}
          ],
        //gauge:{
          //bar: {color: 'rgba(0, 0, 0, 0, 1.0'},
          //teps: [
            //{range: [0,2], color: 'rgba(255, 0, 0, 0.8)'},
            ///{range: [2,4], color: 'rbga(249, 180, 45, 1)'},
            //{range: [4,6], color: 'rbga(255, 255, 0, 1)'},
            //{range: [6,8], color: 'rbga(0, 255, 0, 0.8)'},
            //{range: [8,10], color: 'rbga(0, 128, 0, 0.8)'}
          //],


      } }
   ];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 0, b: 0 },
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge',gaugeData, gaugeLayout);
  });
}
