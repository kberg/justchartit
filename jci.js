var g;

var default_opts = {
  // Google Visualization library colors.
  colors: [ '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#651067', '#329262', '#5574A6', '#3B3EAC', '#B77322', '#16D620', '#B91383', '#F4359E', '#9C5935', '#A9C413', '#2A778D', '#668D1C', '#BEA413', '#0C5922', '#743411' ],
  strokeWidth: 1.5,
  gridLineWidth: 0.1,
  legend: 'always',
  axes: {
    y: {
      pixelsPerLabel: 60
    }
  },
  rightGap: 50,
  animatedZooms: true,
  legend: 'always',
  gridLineWidth: 0.1,
  strokeWidth: 1.5
};

var palette = new MultiPalette();

function chartIt() {
  var data = $('#data').attr('value');
  $('#options').val(palette.toHash());
  var elem = document.getElementById("chart")
  // Clean the graph before redrawing.
  elem.innerHTML = "";
  elem.removeAttribute("style");
 
  var options = palette.read();
      
  // Replace the drawCallback function with one that also lets us track
  // all labels (for the palette.)
  // If the drawCallback option is not specified, use a null function.
  var originalDraw = options["drawCallback"] || function() {};
  options.drawCallback = function(g, isInitial) {
    palette.setSeries(g.getLabels());
    // Call the original function, too.
    originalDraw(g, isInitial);
  };

  g = new Dygraph(elem, data, options);
}

$(function() {
  palette.create($("#optionsPalette")[0]);
  palette.write(default_opts);
  palette.onchange = chartIt;
  chartIt();
});

/*
{
  series: "Queries",
  x: "2012-04-08",
  text: "i18n launch",
  tickHeight: 60
},
{
  series: "Queries",
  x: "2012-04-17",
  text: "i18n cleanup",
  tickHeight: 60
},
{
  series: "Queries",
  x: "2012-05-10",
  text: "CJK launch",
  tickHeight: 60
},
{
  series: "Queries",
  x: "2012-06-14",
  text: "bag of words launch",
  tickHeight: 60
}
*/

