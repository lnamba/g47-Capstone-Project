<template lang="html">
  <div class="grid-container">
    <div class="row">
      <div class="cell medium-10">
        <div class="row">
          <h1>Exercise Summary</h1>
          <h2 class="text-center"><b>You answered {{points}}/{{resLength}} questions correctly!</b></h2>
          <div id="pie"></div>
        </div>
        <div class="row">
          <div class="small-6">
            <div class="row">
              <div id="next" class="medium-3 float-left">
                <button v-if="!points" class="button warning large" @click="nextRound">Try Again!</button>
                <button v-else class="button success large" @click="nextRound">Next Round</button>
              </div>
              <div id="quit" class="medium-3 float-right">
                <button class="button alert large" @click="end">End Game</button>
              </div>
            </div>
          </div>
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
    console.log(this.resLength);
    if (!this.resLength) {
      this.$router.push('sentences')
    }
    let incorrect = this.resLength - this.points;
    let correct = this.points;
    let data;
    if (incorrect === this.resLength) {
      let pie = document.getElementById('pie');
      let h1 = document.createElement('h1');
      let i = document.createElement('i');
      h1.innerHTML = 'Retry';
      h1.className = 'text-center';
      h1.style.fontSize = '5em';
      h1.style.marginTop = '80px';
      h1.style.fontFamily = `'Raleway', sans-serif`;
      i.className = 'fi-refresh text-center';
      i.style.fontSize = '5em';
      i.style.width = '100%';
      i.style.display = 'inline-block'
      pie.appendChild(h1)
      pie.appendChild(i)
    } else {
      let duration = 500, transition = 200;
      let percentage = (correct/this.resLength).toFixed(2) * 100;
      let colors = ['#18B349', '#D41F25']

      drawDonutChart(
        '#pie',
        percentage,
        290,
        290,
        '.35em'
      );

      function drawDonutChart(element, percent, width, height, text_y) {
        width = typeof width !== 'undefined' ? width : 290;
        height = typeof height !== 'undefined' ? height : 290;
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
        .each(function(d,i) { this._current = d; }); // store the initial values
        console.log(path);


        var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", text_y)
        .style("font-size", "5em");

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
      };

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
  .grid-container {
    height: 100vh
  }

  h1 {
    margin-top: 30px;
    margin-left: 20px;
  }

  h2 {
    margin: 120px 0 60px 0;
  }

  /*.arc, svg{
    border: 1px solid #000;
    stroke: #000;
  }*/

  #pie {
    text-align: center;
  }

  path.color0 {
  fill: #1072b8;
  }

  path.color1 {
    fill: #35526b;
  }

  #next {
    margin-left: 50px;
  }

  #quit {
    margin-right: 50px;
  }

</style>
