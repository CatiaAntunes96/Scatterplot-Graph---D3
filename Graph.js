document.addEventListener("DOMContentLoaded", () => {
    
    let margin = {
        top: 100,
        right: 20,
        bottom: 30,
        left: 60
      },
      width = 920 - margin.left - margin.right,
      height = 630 - margin.top - margin.bottom;

    let svgContainer = d3.select(".svg-container")
                        .append("svg")
                        .attr('width', width)
                        .attr('height', height);

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
            
            let parsedTime;
            //Defines the array with the years
            let years = data.map(el => {
                el.Place = +el.place;
                parsedTime = el.Time.split(":");
                el.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
            })
            
           
            //Define values for the x-axis
            let xScale = d3.scaleLinear()
                            .range([0, width])
                            .domain([d3.min(data, el => el.Year - 1),
                                    d3.max(data, el => el.Year + 1 )]);
                               

            //Remove the decimal case from the year
            let formatxAxis = d3.format('d');

            //Create the x-axis and append to svg
            let xAxis = d3.axisBottom(xScale)
                            .tickFormat(formatxAxis)
                                    
                  
            let xAxisGroup = svgContainer.append("g")
                                        .call(xAxis)
                                        .attr("id", "x-axis")
                                        .attr("font-size", 13)
                                        .attr("transform", "translate(0," + height + ")")
                                        .attr("x", width)
                                        .attr("y", -6)
                                        .style("text-anchor", "end")
                                        .text("Year");

            //Defines array with time
            let times = data.map(el => el.Time);
            
           let formatyAxis = d3.timeFormat("%H:%M");

            let yScale = d3.scaleTime()
                            .range([0, height])
                            .domain(d3.extent(data, el => el.Time));
                            

            let yAxis = d3.axisLeft(yScale)
                            .tickFormat(formatyAxis)
                            

            let yAxisGroup = svgContainer.append("g")
                                        .call(yAxis)
                                        .attr("id", "y-axis")
                                        .attr('transform', 'translate(60, 0)');

            d3.select('svg').selectAll('rect')
                .data(times)
                .enter()
                .append("circle")
                .attr("cx", )

        })

        




})