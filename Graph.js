document.addEventListener("DOMContentLoaded", () => {
    
    let width = 800;
    let heigth = 400;

    let svgContainer = d3.select("svg-container")
                        .append("svg")
                        .attr('width', width + 100)
                        .attr('height', heigth + 60);
    
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
        .then(data => {
            svgContainer.append("text")
                        .attr('transform', 'rotate(-90)')
                        .attr('x', -200)
                        .attr('y', 80)
                        .text("Time in Minutes")
        })
        




})