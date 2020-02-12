document.addEventListener("DOMContentLoaded", () => {
    
    let margin = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 80
      },
      width = 920 - margin.left - margin.right,
      height = 580 - margin.top - margin.bottom;
    
    // Define the div for the tooltip
    let tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);
    
    //Add the svg 
    let svgContainer = d3.select(".svg-container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "graph")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    let parsedTime;
    
    d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
      .then(data => {

        //Get de years value
        data.forEach(el => {
            el.Place = +el.Place;
            parsedTime = el.Time.split(':');
            el.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
          });
        
        
        let color = d3.scaleOrdinal(d3.schemeCategory10);

        //Define de values for x-axis
        let x = d3.scaleLinear()
          .range([0, width]);

        
        let xAxis = d3.axisBottom(x)
            .tickFormat(d3.format("d"));
        
        x.domain([d3.min(data, el => el.Year - 1), d3.max(data, el => el.Year + 1)]);

          //Add de x-axis to svg
        svgContainer.append("g")
        .attr("class", "x-axis")
        .attr("id","x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Year");

        //Define values for y-axis
        let y = d3.scaleTime()
          .range([0, height]);
        
            //Define the format of the time
        let timeFormat = d3.timeFormat("%M:%S");

        let yAxis = d3.axisLeft(y)
            .tickFormat(timeFormat);

        y.domain(d3.extent(data,el => el.Time));

          //Add y-axis to svg
        svgContainer.append("g")
            .attr("class", "y-axis")
            .attr("id","y-axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Best Time (minutes)")
        
        //Add vertical text
        svgContainer.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -160)
            .attr('y', -55)
            .attr("class", "labels")
            .text('Time in Minutes');
        
        //Add horizontal text
        svgContainer.append("text")
            .attr("x", 750)
            .attr("y", 525)
            .attr("class", "labels")
            .text("Years");

        //Add dots with data
        svgContainer.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 6)
            .attr("cx", el => x(el.Year))
            .attr("cy", el => y(el.Time))
            .attr("data-xvalue", el => el.Year)
            .attr("data-yvalue", el => el.Time.toISOString())
            .style("fill", el => color(el.Doping != ""))
            .on("mouseover", el => {
              tooltip.style("opacity", .9)
              tooltip.attr("data-year", el.Year)
              tooltip.html(el.Name + ": " + el.Nationality + "<br/>"
                      + "Year: " +  el.Year + ", Time: " + timeFormat(el.Time) 
                      + (el.Doping?"<br/><br/>" + el.Doping:""))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
              tooltip.style("opacity", 0);
            });
          
        let legend = svgContainer.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("id", "legend")
            .attr("transform", (d, i) => "translate(0," + (height/2 - i * 20) + ")");
        
          legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);
        
          legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(el => {
              if (el) return "Riders with doping allegations";
              else {
                return "No doping allegations";
              };
            });
        
        });
    
    
      
})