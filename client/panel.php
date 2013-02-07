<html>
<head>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script src="jquery.masonry.min.js"></script>
<script type="text/javascript" src="../utilidadesJS/assets/js/paper.js"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/map.js" canvas="mapa"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato1"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato2"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato3"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato4"></script>

<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato5"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato6"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge2.js" canvas="dato7"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato8"></script>

<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato9"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato10"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato11"></script>
<script type="text/paperscript" src="../utilidadesJS/assets/js/gauge1.js" canvas="dato12"></script>

<script>

$(function(){
  $('#container').masonry({
    // options
    itemSelector : '.item',
    columnWidth : 220
  });
});

</script>

<style>

.item {
	background-color: #222;	
	width: 200px;
	height: 200px;
	margin: 10px;
	float: left;
}

.map {
	background-color: #444;	
	width: 640px;
	height: 640px;
}

.big {
	width: 420px;
	height: 420px;
}

.map h2 {
		background-color: #222;
		color: #666;
}

body {
	background-color: #333;
}

h1 {
	text-align: center;
	font-size: 78px;
	font-family: arial;
	color: #444;
	margin: 0px;
}

h2 {
	font-family: arial;
	color: #666;
	display: block;
	text-align: center;
	background-color: #1d1d1d;
	margin-top: 0px;
	padding: 10px;
	font-size: 30px;
}

</style>

</head>

<body>

<div>

	<h1>telemetry 0.0</h1>

</div>


<div id="container">
  <div class="map item">
	<h2>Mapa</h2>
  	<canvas id="mapa" resize></canvas>
  </div>
  <div class="item ">
  	<h2>Dato 1</h2>
  	<canvas id="dato1" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 2</h2>
  	<canvas id="dato2" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 3</h2>
  	<canvas id="dato3" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 4</h2>
  	<canvas id="dato4" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 5</h2>
  	<canvas id="dato5" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 6</h2>
  	<canvas id="dato6" resize></canvas>
  </div>

  <div class="item big">
  	<h2>Dato 7</h2>
  	<canvas id="dato7" resize></canvas>
  </div>

   <div class="item ">
  	<h2>Dato 8</h2>
  	<canvas id="dato8" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 9</h2>
  	<canvas id="dato9" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 10</h2>
  	<canvas id="dato10" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 11</h2>
  	<canvas id="dato11" resize></canvas>
  </div>

  <div class="item ">
  	<h2>Dato 12</h2>
  	<canvas id="dato12" resize></canvas>
  </div>



</div>


</body>
</html>
