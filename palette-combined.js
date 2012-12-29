"use strict";function TextArea(c){var a=document.getElementsByTagName("body")[0];if(!c){c=a}this.elem=TextArea.createChild("div",c,"textarea");this.title=TextArea.createChild("div",this.elem,"title");this.textarea=TextArea.createChild("textarea",this.elem,"editor");this.buttons=TextArea.createChild("div",this.elem,"buttons");this.ok=TextArea.createChild("button",this.buttons);this.ok.textContent="OK";this.cancel=TextArea.createChild("button",this.buttons);this.cancel.textContent="Cancel";this.height=315;this.width=445;var b=this;this.ok.onclick=function(){b.hide();b.okCallback(b.textarea.value)};this.cancel.onclick=function(){b.hide();b.cancelCallback()};this.reposition=function(){var e=(document.documentElement.clientWidth-b.elem.offsetWidth)/2;var d=(document.documentElement.clientHeight-b.elem.offsetHeight)/2;b.elem.style.left=Math.max(e,0)+"px";b.elem.style.top=Math.max(d,0)+"px"};this.background=TextArea.createChild("div",a,"background");this.background.id="modalBackground";this.hide()}TextArea.createChild=function(c,b,a){var d=document.createElement(c);b.appendChild(d);if(a){d.className=a}return d};TextArea.prototype.cancelCallback=function(){};TextArea.prototype.okCallback=function(a){};TextArea.prototype.show=function(d,c){this.title.textContent=d;this.textarea.value=c;var b=function(j,f,i){var h=0;for(var e in j){h+=parseInt(j[e][i])}for(var g in f){h-=parseInt(f[g][i])}return h};this.elem.style.display="block";this.background.style.display="block";this.elem.style.height=this.height+"px";this.elem.style.width=this.width+"px";this.textarea.style.height=(-18+b([this.elem],[this.title,this.buttons],"offsetHeight"))+"px";this.textarea.style.width=(-16+b([this.elem],[],"offsetWidth"))+"px";var a=this;this.keyDownListener_=function(e){if(e.keyCode==13){a.hide()}if(e.keyCode==27){a.hide()}};Dygraph.addEvent(document,"keydown",this.keyDownListener_);this.reposition();window.addEventListener("resize",this.reposition,false);document.documentElement.addEventListener("onscroll",this.reposition)};TextArea.prototype.hide=function(){Dygraph.removeEvent(document,"keypress",this.keyDownListener_);this.keyDownListener_=null;this.elem.style.display="none";this.background.style.display="none";window.removeEventListener("resize",this.reposition);document.documentElement.removeEventListener("onscroll",this.reposition)};"use strict";var Samples={};Samples.data=[{id:"interestingShapes",title:"Interesting Shapes",data:function(){var c=function(d){if(d<10){return"0"+d}else{return d}};var b="date,parabola,line,another line,sine wave\n";for(var a=1;a<=31;a++){b+="201110"+c(a);b+=","+10*(a*(31-a));b+=","+10*(8*a);b+=","+10*(250-8*a);b+=","+10*(125+125*Math.sin(0.3*a));b+="\n"}return b},options:{colors:["rgb(51,204,204)","rgb(255,100,100)","#00DD55","rgba(50,50,200,0.4)"],labelsSeparateLines:true,labelsKMB:true,legend:"always",width:640,height:480,title:"Interesting Shapes",xlabel:"Date",ylabel:"Count",axisLineColor:"white",drawXGrid:false,pointClickCallback:function(){alert("p-click!")}}},{id:"sparse",title:"Sparse Data",data:[[new Date("2009/12/01"),10,10,10],[new Date("2009/12/02"),15,11,12],[new Date("2009/12/03"),null,null,12],[new Date("2009/12/04"),20,14,null],[new Date("2009/12/05"),15,null,17],[new Date("2009/12/06"),18,null,null],[new Date("2009/12/07"),12,14,null]],options:{labels:["Date","Series1","Series2","Series3"]}},{id:"manyPoints",title:"Dense Data",data:function(){var l=1000;var c=100;var e=[];var a=0;var g=2*Math.PI;var h=0.5;var n=(g-a)/(l-1);for(var f=0;f<l;++f){var m=a+n*f;var b=[m];for(var d=0;d<c;d++){var k=Math.pow(Math.random()-Math.random(),7);b.push(k)}e[f]=b}return e},options:{labelsSeparateLines:true,width:640,height:480,title:"Many Points",axisLineColor:"white",}},{id:"errorBars",title:"Error Bars",data:[[1,[10,10,100]],[2,[15,20,110]],[3,[10,30,100]],[4,[15,40,110]],[5,[10,120,100]],[6,[15,50,110]],[7,[10,70,100]],[8,[15,90,110]],[9,[10,50,100]]],options:{customBars:true,errorBars:true}},{id:"perSeries",title:"Per Series Options",data:function(){var c=function(d){if(d<10){return"0"+d}else{return d}};var b="date,parabola,line,another line,sine wave,sine wave2\n";for(var a=1;a<=31;a++){b+="200610"+c(a);b+=","+10*(a*(31-a));b+=","+10*(8*a);b+=","+10*(250-8*a);b+=","+10*(125+125*Math.sin(0.3*a));b+=","+10*(125+125*Math.sin(0.3*a+Math.PI));b+="\n"}return b},options:{strokeWidth:2,series:{parabola:{strokeWidth:0,drawPoints:true,pointSize:4,highlightCircleSize:6},line:{strokeWidth:1,drawPoints:true,pointSize:1.5},"sine wave":{strokeWidth:3,highlightCircleSize:10},"sine wave2":{strokePattern:[10,2,5,2],strokeWidth:2,highlightCircleSize:3}}}}];Samples.indexOf=function(b){for(var a in Samples.data){if(Samples.data[a].id==b){return a}}return null};"use strict";function Palette(a){this.model={};this.onchange=function(){};this.scope=a;this.root=null}Palette.prototype.create=function(b){var a=this;var c=$("<div>").addClass("palette").width(300).appendTo(b);this.root=c;this.tooltip=new Tooltip();$.each(PaletteOptions,function(e,j){try{var k=j.scope||["global"];var d=k[0]=="*"||$.inArray(a.scope,k)>=0;if(!d){return}var h=j.type;var f=h.indexOf("function(")==0;var i;if(f){i=$("<button>").click(function(n,m){return function(s){var r=m.model[n];var o=r.functionString;var q=PaletteOptions[n].type;if(o==null||o.length==0){o=q+"{\n\n}"}var p=new TextArea();p.show(n,o);p.okCallback=function(t){if(t!=o){r.functionString=t;r.input.textContent=t?"defined":"not defined";m.onchange()}}}}(e,a))}else{if(h=="boolean"){i=$("<button>").click(function(n){var m=n.target;if(m.value=="none"){Palette.populateBooleanButton(m,"true")}else{if(m.value=="true"){Palette.populateBooleanButton(m,"false")}else{Palette.populateBooleanButton(m,"none")}}a.onchange()})}else{i=$("<input>",{type:"text"}).addClass("textInput").keypress(function(n){var m=n.which;if(m==13||m==8){a.onchange()}})}}var l=$("<div>").append($("<span>").addClass("name").text(e)).append($("<span>").addClass("option").append(i));l.mouseover(function(o,p,n,m){return function(){a.tooltip.show(o,p,n,m)}}(l,e,h,Dygraph.OPTIONS_REFERENCE[e].description)).mouseout(function(){a.tooltip.hide()});l.appendTo(c);a.model[e]={input:i,row:l}}catch(g){throw"For option "+e+":"+g}});this.filter("")};Palette.parseStringArray=function(a){if(a==null||a.length==0){return null}return a.split(";")};Palette.parseBooleanArray=function(a){if(a==null||a.length==0){return null}return a.split(",").map(function(b){return b.trim()=="true"})};Palette.parseFloatArray=function(a){if(a==null||a.length==0){return null}return a.split(",").map(function(b){return parseFloat(b)})};Palette.parseIntArray=function(a){if(a==null||a.length==0){return null}return a.split(",").map(function(b){return parseInt(b)})};Palette.prototype.read=function(){var results={};for(var opt in this.model){if(this.model.hasOwnProperty(opt)){var type=PaletteOptions[opt].type;var isFunction=type.indexOf("function(")==0;var input=this.model[opt].input[0];var value=isFunction?this.model[opt].functionString:input.value;if(value&&value.length!=0){if(type=="boolean"){if(value=="false"){results[opt]=false}if(value=="true"){results[opt]=true}}else{if(type=="int"){results[opt]=parseInt(value)}else{if(type=="float"){results[opt]=parseFloat(value)}else{if(type=="array<string>"){results[opt]=Palette.parseStringArray(value)}else{if(type=="array<float>"){results[opt]=Palette.parseFloatArray(value)}else{if(type=="array<boolean>"){results[opt]=Palette.parseBooleanArray(value)}else{if(type=="array<int>"){results[opt]=Palette.parseIntArray(value)}else{if(type=="array<Date>"){results[opt]=Palette.parseIntArray(value)}else{if(isFunction){var localVariable=null;eval("localVariable = "+value);results[opt]=localVariable}else{results[opt]=value}}}}}}}}}}}}return results};Palette.prototype.write=function(f){var c={};for(var b in this.model){if(this.model.hasOwnProperty(b)){var a=this.model[b].input[0];var d=PaletteOptions[b].type;var e=f[b];if(d=="boolean"){var g=e==true?"true":(e==false?"false":"none");Palette.populateBooleanButton(a,g)}else{if(d=="array<string>"){if(e){a.value=e.join("; ")}}else{if(d.indexOf("array")==0){if(e){a.value=e.join(", ")}}else{if(d.indexOf("function(")==0){a.textContent=e?"defined":"not defined";this.model[b].functionString=e?e.toString():null}else{if(e!=undefined){a.value=e}}}}}}}};Palette.populateBooleanButton=function(a,b){a.innerHTML=b;a.value=b};Palette.prototype.filter=function(c){c=c.toLowerCase();var e=true;for(var a in this.model){if(this.model.hasOwnProperty(a)){var d=this.model[a].row;var b=a.toLowerCase().indexOf(c)>=0;d.toggle(b);if(b){d.attr("class",e?"even":"odd");e=!e}}}};function MultiPalette(){this.palettes={};this.root=null;this.filterBar=null;this.activePalette=null;this.onchange=function(){}}MultiPalette.optionSetValues={global:"global",x:"x axis",y:"y axis",y2:"y2 axis",};MultiPalette.prototype.create=function(a){var c=this;this.root=$("<div>").addClass("palette").appendTo(a);var e=$("<div>").addClass("header").appendTo(this.root);var b=$("<div>").appendTo(e);this.optionSelector=$("<select>").change(function(f){c.activate(c.optionSelector.val())});b.append($("<span>").text("Option Set:")).append(this.optionSelector).append($("<span>").append($("<a>").addClass("link").text("to hash").css("float","right").css("padding-right","8px").click(function(){c.showHash()})));var d=function(){$.each(c.palettes,function(f,g){g.filter(c.filterBar.val())})};this.filterBar=$("<input>",{type:"search"}).keyup(d).click(d);e.append($("<div>").append($("<span>").text("Filter:")).append($("<span>").append(this.filterBar)).append($("<span>").append($("<a>").addClass("link").text("Redraw").css("float","right").css("padding-right","8px").click(function(){c.onchange()}))));$.each(MultiPalette.optionSetValues,function(f,g){c.createPalette_(f,f,g)});this.activate("global")};MultiPalette.prototype.createPalette_=function(c,d,e){this.optionSelector.append($("<option></option>").attr("value",c).text(e));var a=new Palette(d);a.create(this.root);a.root.hide();var b=this;a.onchange=function(){b.onchange()};this.palettes[c]=a};MultiPalette.prototype.setSeries=function(b){for(var a=1;a<b.length;a++){this.conditionallyAddSingleSeries_(b[a])}};MultiPalette.prototype.conditionallyAddSingleSeries_=function(b){var a="series:"+b;if(!this.palettes.hasOwnProperty(a)){this.createPalette_(a,"series",b+" (series)")}};MultiPalette.prototype.activate=function(a){if(this.activePalette){this.activePalette.root.hide()}this.activePalette=this.palettes[a];this.activePalette.root.show()};MultiPalette.prototype.showHash=function(){var a=this.toHash();textarea.show("options",a)};MultiPalette.prototype.toHash=function(){var d=this.read();var h=new TextArea();h.cancel.style.display="none";var f="<~%!<";var g=">!%~>";var b=function(j,k){if(typeof k==="function"){return f+k.toString()+g}return k};var i=JSON.stringify(d,b,2);while(true){var a=i.indexOf(f);var c=i.indexOf(g);if(a==-1){break}var e=i.substring(a+f.length,c);while(e.indexOf("\\n")>=0){e=e.replace("\\n","\n")}while(e.indexOf('\\"')>=0){e=e.replace('\\"','"')}i=i.substring(0,a-1)+e+i.substring(c+g.length+1)}return i};MultiPalette.prototype.read=function(){var e=this.palettes.global.read();e.axes={};e.series={};var b=function(g,f){var h=g[f];if($.isEmptyObject(h)){delete g[f]}};var a=function(g){for(var f in g){if(g.hasOwnProperty(f)){b(g,f)}}};e.axes.x=this.palettes.x.read();e.axes.y=this.palettes.y.read();e.axes.y2=this.palettes.y2.read();a(e.axes);b(e,"axes");for(var d in this.palettes){if(d.indexOf("series:")==0){var c=d.substring("series:".length);e.series[c]=this.palettes[d].read()}}a(e.series);b(e,"series");return e};MultiPalette.prototype.write=function(c){this.palettes.global.write(c);if(c.hasOwnProperty("axes")){var b=c.axes;this.palettes.x.write(b.x||{});this.palettes.y.write(b.y||{});this.palettes.y2.write(b.y2||{})}if(c.hasOwnProperty("series")){for(var a in c.series){if(c.series.hasOwnProperty(a)){this.conditionallyAddSingleSeries_(a);this.palettes["series:"+a].write(c.series[a])}}}};"use strict";var PaletteOptions={series:{type:null,scope:[]},axes:{type:null,scope:[]},animatedZooms:{type:"boolean"},annotationClickHandler:{type:"function(annotation, point, dygraph, event)"},annotationDblClickHandler:{type:"function(annotation, point, dygraph, event)"},annotationMouseOutHandler:{type:"function(annotation, point, dygraph, event)"},annotationMouseOverHandler:{type:"function(annotation, point, dygraph, event)"},avoidMinZero:{type:"boolean"},axisLabelColor:{type:"string",},axisLabelFontSize:{type:"int",},axisLabelFormatter:{type:"function(numberOrDate, granularity, opts, dygraph)",scope:["x","y","y2"]},axisLabelWidth:{type:"int",},axisLineColor:{type:"string",},axisLineWidth:{type:"int",},axisTickSize:{type:"int",},clickCallback:{type:"function(e, x, points)"},colorSaturation:{type:"float"},colors:{type:"array<string>"},colorValue:{type:"float"},connectSeparatedPoints:{type:"boolean"},customBars:{type:"boolean"},dateWindow:{type:"array<Date>"},delimiter:{type:"string"},digitsAfterDecimal:{type:"int"},displayAnnotations:{type:"boolean"},drawAxesAtZero:{type:"boolean"},drawCallback:{type:"function(dygraph, is_initial)"},drawGapEdgePoints:{type:"boolean"},drawHighlightPointCallback:{type:"function(g, seriesName, canvasContext, cx, cy, color, pointSize)",scope:["global","series","y","y2"]},drawPoints:{type:"boolean",scope:["global","series","y","y2"]},drawPointCallback:{type:"function(g, seriesName, canvasContext, cx, cy, color, pointSize)",scope:["global","series","y","y2"]},drawXAxis:{type:"boolean"},drawXGrid:{type:"boolean"},drawYAxis:{type:"boolean"},drawYGrid:{type:"boolean"},errorBars:{type:"boolean"},fillAlpha:{type:"float"},fillGraph:{type:"boolean"},fractions:{type:"boolean"},gridLineColor:{type:"string"},gridLineWidth:{type:"int"},height:{type:"int"},hideOverlayOnMouseOut:{type:"boolean"},highlightCallback:{type:"function(event, x, points,row)"},highlightCircleSize:{type:"int",scope:["global","series","y","y2"]},includeZero:{type:"boolean"},isZoomedIgnoreProgrammaticZoom:{type:"boolean"},labelsDivWidth:{type:"integer"},labels:{type:"array<string>"},labelsKMB:{type:"boolean"},labelsKMG2:{type:"boolean"},labelsSeparateLines:{type:"boolean"},labelsShowZeroValues:{type:"boolean"},legend:{type:"string"},logscale:{type:"boolean"},maxNumberWidth:{type:"int"},panEdgeFraction:{type:"float"},pixelsPerLabel:{type:"int"},pixelsPerXLabel:{type:"int"},pixelsPerYLabel:{type:"int"},pointClickCallback:{type:"function(e, point)"},pointSize:{type:"integer",scope:["global","series","y","y2"]},rangeSelectorHeight:{type:"int"},rangeSelectorPlotFillColor:{type:"int"},rangeSelectorPlotStrokeColor:{type:"int"},rightGap:{type:"boolean"},rollPeriod:{type:"int"},showLabelsOnHighlight:{type:"boolean"},showRangeSelector:{type:"boolean"},showRoller:{type:"boolean"},sigFigs:{type:"int"},sigma:{type:"float"},stackedGraph:{type:"boolean"},stepPlot:{type:"boolean"},strokeBorderColor:{type:"string",scope:["global","series","y","y2"]},strokeBorderWidth:{type:"float",scope:["global","series","y","y2"]},strokePattern:{type:"array<int>",scope:["global","series","y","y2"]},strokeWidth:{type:"float",scope:["global","series","y","y2"]},timingName:{type:"string"},title:{type:"string"},titleHeight:{type:"integer"},underlayCallback:{type:"function(canvas, area, dygraph)"},unhighlightCallback:{type:"function(event)"},valueRange:{type:"array<float>"},visibility:{type:"array<boolean>"},width:{type:"int"},wilsonInterval:{type:"boolean"},xAxisHeight:{type:"int"},xAxisLabelWidth:{type:"int"},xLabelHeight:{type:"int"},xlabel:{type:"string"},xValueParser:{type:"function(str)"},yAxisLabelWidth:{type:"int"},yLabelWidth:{type:"int"},ylabel:{type:"string"},zoomCallback:{type:"function(minDate, maxDate, yRanges)"}};"use strict";function Tooltip(a){if(!a){a=$("body")[0]}this.elem=$("<div>").attr("class","tooltip").appendTo(a);this.title=$("<div>").attr("class","title").appendTo(this.elem);this.type=$("<div>").attr("class","type").appendTo(this.elem);this.body=$("<div>").attr("class","body").appendTo(this.elem);this.hide()}Tooltip.prototype.show=function(c,e,b,a){this.title.html(e);this.body.html(a);this.type.text(b);var d=c.offset();this.elem.css({width:"280",top:parseInt(d.top+c[0].offsetHeight)+"px",left:parseInt(d.left+10)+"px",visibility:"visible"})};Tooltip.prototype.hide=function(){this.elem.css("visibility","hidden")};