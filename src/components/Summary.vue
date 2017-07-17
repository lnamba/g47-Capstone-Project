<template lang="html">
  <div class="grid-container">
    <div class="row">
      <div class="cell medium-10">
        <div class="row">
          <h1>Exercise Summary</h1>
          <h2 class="text-center">You answered {{points}}/{{resLength}} questions correctly!</h2>
          <div id="pie" class="small-centered float-center"></div>
          <button class="button success large" @click="nextRound">Next Round</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data(){
    return {
      points: this.$store.state.sentencePoints,
      resLength: this.$store.state.res.length,
    }
  },
  mounted(){
    let incorrect = this.resLength - this.points;
    let correct = this.points;
    let data;
    if (correct && incorrect){
      data = [{
        'name': `${(correct/this.resLength).toFixed(2) * 100}% Correct`,
        'points': correct
      },
      {
        'name': `${(incorrect/this.resLength).toFixed(2) * 100}% Incorrect`,
        'points': incorrect
      }];
    } else if (!correct) {
      data = [{
        'name': 'Try again!',
        'points': incorrect
      }]
    } else {
      data = [{
        'name': '100% Correct',
        'points': correct
      }]
    }
    let width = 400, height = 400, radius = Math.min(width, height)/2;
    let color
    if (!correct){
      color = d3.scaleOrdinal().range(['#DA1821']);
    } else {
      color = d3.scaleOrdinal().range(['#15B61F', '#DA1821']);
    }
    let pie = d3.pie().value(function(d){
      return d.points;
    })(data);
    let arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
    let labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);
    let svg = d3.select('#pie').append('svg').style('display', 'block').style('margin', '0 auto').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width/2 + ',' + height/2 + ')').attr('class', 'float-center');
    let g = svg.selectAll('arc').data(pie).enter().append('g').attr('class', 'arc');

    g.append('path').attr('d', arc).style('stroke', '#000').style('stroke-width', '5').style('fill', function(d){
      return color(d.data.name)
    })
    g.append('text').attr("text-anchor", "middle")
    .attr('transform', function(d) {
        return 'translate(' + arc.centroid(d) + ')';
    })
    .text(function(d) {
        return d.data.name;
    })
    .style('fill', '#000').style('font-size', '1.2em').style('font-family', 'Tahoma, "Helvetica Neue", sans-serif')
  },
  methods: {
    nextRound(){
      this.$store.state.hidebutton = false;
      console.log('here is the results', this.$store.state.correctAnswers);
      this.$store.dispatch('POST_RESULTS')
      this.$router.push('sentences')
    }
  }
}
</script>

<style lang="css" scoped>
  h1 {
    margin-top: 30px;
    margin-left: 20px;
  }

  h2 {
    margin-top: 50px;
  }

  .arc, svg{
    border: 1px solid #000;
    stroke: #000;

  }
</style>
