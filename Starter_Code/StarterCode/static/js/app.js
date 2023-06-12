function optionChanged(selectedSample) {
    // fetch json daata
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    //filter samples and metadata on selected id
        const filteredSample = data.samples.filter(s => s.id === selectedSample)[0];
        const filteredMetadata = data.metadata.filter(m => m.id === parseInt(selectedSample))[0];

        //horizontal barchart, create trace using filtered sample data
        const traceBar = {
            x: filteredSample.sample_values.slice(0, 10).reverse(),
            y: filteredSample.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`),
            text: filteredSample.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        // layout of bar chart
        const layoutBar = { title: "Top 10 OTUs" };
        //plot the bar chart
        Plotly.newPlot("bar", [traceBar], layoutBar);

        // bubble chart, create trace using same filtered data
        const traceBubble = {
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            text: filteredSample.otu_labels,
            mode: "markers",
            marker: {
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids,
                colorscale: "Earth"
            }
        };
        //layout and plot of bubble chart
        const layoutBubble = { title: "OTU Samples", xaxis: {title: "OTU ID"}, yaxis: {title: "Sample Values"} };
        Plotly.newPlot("bubble", [traceBubble], layoutBubble);

        //display metadata, select metadata div elkement
        const metadataDiv = d3.select("#sample-metadata");
        //clear metatdat div content
        metadataDiv.html("");

        //iterate through filtered metadat and append key,value as p
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            metadataDiv.append("p").text(`${key}: ${value}`);
        });
    });
}

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    //selected dropdown menu
    const dropdownMenu = d3.select("#selDataset");
    //populate dropdown
    data.names.forEach(name => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    //start page with firstsample
    optionChanged(data.names[0]);
});

