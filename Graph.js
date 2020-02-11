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
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let tooltip = d3.select(".svg-container")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
        .then(data => {
            svgContainer.append("text")
                        .attr('transform', 'rotate(-90)')
                        .attr('x', -200)
                        .attr('y', 40)
                        .style("font-size", 18)
                        .text("Time in Minutes");
            
            let parsedTime;
            //Defines the array with the years
            let years = data.map(el => {
                el.Place = +el.Place;
                parsedTime = el.Time.split(":");
                el.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
            })

            //Define values for the x-axis
           let x = d3.scaleLinear()
                    .range([0, width]);
           
            x.domain([d3.min(data, el => el.Year - 1), d3.max(data, el => el.Year + 1 )]);
                               
            //Remove the decimal case from the year
            let formatxAxis = d3.format('d');

            //Create the x-axis and append to svg
            let xAxis = d3.axisBottom(x)
                            .tickFormat(formatxAxis)
                    
            let xAxisGroup = svgContainer.append("g")
                                        .call(xAxis)
                                        .attr("id", "x-axis")
                                        .attr("font-size", 13)
                                        .attr("transform", "translate(0," + height + ")")
                                        .attr("x", width)
                                        .attr("y", -6)

            //Define values for y-axis
           let formatyAxis = d3.timeFormat("%M:%S");

            let y = d3.scaleTime()
                        .range([0, height]);
            
            y.domain(d3.extent(data, el => el.Time));
                            
            let yAxis = d3.axisLeft(y)
                            .tickFormat(formatyAxis)
                            

            let yAxisGroup = svgContainer.append("g")
                                        .call(yAxis)
                                        .attr("id", "y-axis")
                                        .attr("font-size", 12)
                                        .attr("y", 6)
                                        .attr("dy", ".71em")
                                        

            d3.select('svg').selectAll('.dot')
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 6)
                .attr("cx", el => x(el.Year))
                .attr("cy", el => y(el.Time))
                .attr("data-xvalue", el => el.Year)
                .attr("data-yvalue", el => el.Time.toISOString())
                .style("fill", el => color(el.Doping != ""))


        })

        




})