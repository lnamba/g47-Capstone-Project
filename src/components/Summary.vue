<template lang="html">
  <div class="grid-x grid-padding-x">
    <div class="cell medium-6" id="summary">
      <h1>Exercise Summary</h1>
      <h2 class="text-center">You answered {{points}}/{{resLength}} questions correctly!</h2>
      <div id="next">
        <button v-if="!points" class="button warning large float-left" @click="nextRound">Try Again!</button>
        <button v-else class="button success large float-left" @click="nextRound">Next Round</button>
      </div>
      <div id="quit">
        <button class="button alert large float-right" @click="end">End Game</button>
      </div>
    </div>
    <div class="cell medium-6" id="chart">
      <div id="pie"></div>
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
    console.log(this.resLength);
    if (!this.resLength) {
      this.$router.push('sentences')
    }
    let incorrect = this.resLength - this.points;
    let correct = this.points;
    let data;
      let duration = 800, transition = 200;
      let percentage = (correct/this.resLength).toFixed(2) * 100;
      // let colors = ['#18B349', '#D41F25']
      let colors = ['#4FC08D', '#DA5961']

      drawDonutChart(
        '#pie',
        percentage,
        370,
        370,
        '.35em'
      );

      function drawDonutChart(element, percent, width, height, text_y) {
        width = typeof width !== 'undefined' ? width : 350;
        height = typeof height !== 'undefined' ? height : 350;
        text_y = typeof text_y !== 'undefined' ? text_y : "-.10em";

        let dataset = {
          lower: calcPercent(0),
          upper: calcPercent(percent)
        },
        radius = Math.min(width, height) / 2,
        pie = d3.pie().sort(null),
        format = d3.format(".0%");

        var arc = d3.arc()
        .innerRadius(radius - 30)
        .outerRadius(radius);

        var svg = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var path = svg.selectAll("path")
        .data(pie(dataset.lower))
        .enter().append("path")
        .style("fill", function(d, i) { return colors[i] })
        .attr("class", function(d, i) { return "color" + i })
        .attr("d", arc)
        .each(function(d,i) { this._current = d; });

        var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", text_y)
        .style("font-size", "5em")
        .style("color", "#FFF")
        .style("font-family", "Raleway")

        if (typeof(percent) === "string") {
          text.text(percent);
        }
        else {
          var progress = 0;
          var timeout = setTimeout(function () {
            clearTimeout(timeout);
            path = path.data(pie(dataset.upper)); // update the data
            path.transition().duration(duration).attrTween("d", function (a) {
              var i  = d3.interpolate(this._current, a);
              var i2 = d3.interpolate(progress, percent)
              this._current = i(0);
              return function(t) {
                text.text( format(i2(t) / 100) );
                return arc(i(t));
              };
            });
          }, 200);
        }

      function calcPercent(percent) {
        return [percent, 100-percent];
      };

      }
  },
  methods: {
    nextRound(){
      this.$store.state.hidebutton = false;
      console.log('here is the results', this.$store.state.correctAnswers);
      this.$store.dispatch('POST_RESULTS')
      this.$router.push('sentences')
    },
    end(){
      this.loggedIn = false;
      this.$cookies.remove('user');
      this.$cookies.remove('name');
      this.$cookies.remove('avatar');
      this.$router.push({path:'/'});
    }
  }
}
</script>

<style lang="css" scoped>

  #summary {
    background-color: #545454;
    color: #FFF;
  }

  h1 {
    margin-top: 80px;
    margin-left: 20px;
    font-family: 'Raleway', sans-serif;
    font-weight: 100;
  }

  h2 {
    margin: 170px 0 60px 0;
    font-family: 'Helvetica Neue', Helvetica, 'Roboto', Arial, sans-serif;
    font-weight: 300;
    font-size: 2.5em;
  }

  #pie {
    text-align: center;
    margin: 25% 0;
  }

  #next {
    margin-left: 60px;
  }

  #quit {
    margin-right: 60px;
  }

</style>
