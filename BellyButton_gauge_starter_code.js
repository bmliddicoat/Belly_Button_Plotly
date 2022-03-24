// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaDatafilter = data.metadata.filter(item => item)["id"] == idNum);
    // Create a variable that holds the first sample in the array.
    

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaArray = metaDatafilter[0]

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   var washFreq = metaDatafilter[0].wfreq
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
        type: "indicator",
        mode: "gauge+number",
        axis: {range: [0,9] },
        bar: {color: rbga(0, 0, 0, 1.0) },
        steps: [
          {range: [0,2], color: rgba(255, 0, 0, 0.8),
          range: [2,4], color: rbga(249, 180, 45, 1),
          range: [4,6], color: rbga(255, 255, 0, 1),
          range: [6,8], color: rbga(0, 255, 0, 0.8),
          range: [8,10], color: rbga(0, 128, 0, 0.8)}


         



    },
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge',gaugeData, gaugeLayout);
  });
}
