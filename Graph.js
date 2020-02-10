document.addEventListener("DOMContentLoaded", () => {
    
    let width = 800;
    let heigth = 400;

    let svgContainer = d3.select(".svg-container")
                        .append("svg")
                        .attr('width', width + 100)
                        .attr('height', heigth + 60);

    let tooltip = d3.select(".svg-container")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

    
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
        .then(data => {
            svgContainer.append("text")
                        .attr('transform', 'rotate(-90)')
                        .attr('x', -200)
                        .attr('y', 80)
                        .text("Time in Minutes");
            
            //Defines the array with the years
            let years = data.map(el => el.Year);
            
            //Define values for the x-axis
            let xScale = d3.scaleLinear()
                            .domain([d3.min(years), d3.max(years)])
                            .range([0, width]);

            //Remove the decimal case from the year
            let formatxAxis = d3.format('.0f');

            //Create the x-axis and append to svg
            let xAxis = d3.axisBottom()
                            .scale(xScale)
                            .tickFormat(formatxAxis);          
                  
            let xAxisGroup = svgContainer.append("g")
                                        .call(xAxis)
                                        .attr("id", "x-axis")
                                        .attr("font-size", 13)
                                        .attr('transform', 'translate(60, 400)');

            //Defines array with time
            let times = data.map(el => el.Time);
            
            console.log(d3.min(times))

            let yScale = d3.scaleLinear()
                            .domain([0, d3.max(times)])
                            .range([heigth, 0]);

            let yAxis = d3.axisLeft(yScale)
                            

            let yAxisGroup = svgContainer.append("g")
                                        .call(yAxis)
                                        .attr("id", "y-axis")
                                        .attr('transform', 'translate(60, 0)');

        })

        




})