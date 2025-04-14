

let width = 600, height = 400;

let margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
}

let svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height)


const spf = d3.csv("StudentPerformanceFactors.csv").then(function(data){
    data.forEach(d => {
        d.Tutoring_Sessions = +d.Tutoring_Sessions;  
        d.Family_Income = d.Family_Income
})


let yscale = d3.scaleLinear()
                .domain([0,8])
                .range([height - margin.bottom, margin.top]);

let xscale = d3.scaleBand()
                .domain(data.map(d => d.Family_Income))
                .range([margin.left,width - margin.right])
                .padding(0.5)
                
let yaxis = svg.append('g')
                .call(d3.axisLeft().scale(yscale))
                .attr('transform', `translate(${margin.left}, 0)`)

let xaxis = svg.append('g')
                .call(d3.axisBottom().scale(xscale))
                .attr('transform',`translate(0, ${height - margin.bottom})`)

svg.append('text')
    .attr('x', 250)
    .attr('y', height - 15)
    .text('Family Income')

svg.append('text')
    .attr('x', -250)
    .attr('y', 25)
    .text('Tutoring Sessions')
    .attr('transform', 'rotate(-90)')

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xscale(d.Family_Income))
    .attr('y', d => yscale(d.Tutoring_Sessions))
    .attr('width', xscale.bandwidth())
    .attr('height', d => height - yscale(d.Tutoring_Sessions) - margin.bottom)
    .attr('fill', '#7CCBDA')
    
})