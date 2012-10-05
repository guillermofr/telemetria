<script src="./jquery.js"></script>
<script src="./socket.io.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script>

//socket io
	var socket = io.connect('http://10.1.2.173:1415');
	
	socket.on('SC_test_event', function (data) {
		$('.datos').html('hola '+data.name);
	});

	//actualiza gmaps
	socket.on('SC_UPDATE_PTLB', function (data) {
		UPDATE_PTLB(data);
	});
	socket.on('SC_UPDATE_GPGLL', function (data) {
		UPDATE_GPGLL(data);
	});
	socket.on('SC_UPDATE_GPGGA', function (data) {
		UPDATE_GPGGA(data);
	});
	socket.on('SC_UPDATE_GPGSA', function (data) {
		UPDATE_GPGSA(data);
	});
	socket.on('SC_UPDATE_GPVTG', function (data) {
		UPDATE_GPVTG(data);
	});
	socket.on('SC_UPDATE_GPZDA', function (data) {
		UPDATE_GPZDA(data);
	});
	
	
	
	var map;
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(37.64550, -1.03444);
		var mapOptions = {
		  zoom: 16,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  disableDefaultUI: true
		}
		map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		crea_marker();
	  
	  }
	var marker;
	function crea_marker(){
		var newLL = new google.maps.LatLng(37.34717, -1.03626);
		marker = new google.maps.Marker({
			position: newLL,
			map: map,
			title: 'COCHE'
		});
	}
	
	// data -> Object (lat,lon)
	
	
	
	//Latitud y longitud
	function UPDATE_GPGLL(data){
		var newLL = new google.maps.LatLng(data.lat, data.lon);
		marker.setPosition(newLL);
		$('.lat span').html(data.lat);
		$('.lon span').html(data.lon);
	}
	//información de la batería
	function UPDATE_PTLB(data){
		$('.v_bat').html(data.V);
		$('.i_bat').html(data.I);
		$('.temp_bat').html(data.T);
		$('.w_bat').html(parseFloat(data.V) * parseFloat(data.I));
		$('.mah_bat').html(data.mAh);
	}	
	//Información del bloqueo de satélites 
	function UPDATE_GPGGA(data){
		$('.dop span').html(data.dop);
		var newLL = new google.maps.LatLng(data.lat, data.lon);
		marker.setPosition(newLL);
		$('.lat span').html(data.lat);
		$('.lon span').html(data.lon);
	}
	//Información general sobre los satélites
	function UPDATE_GPGSA(data){
	
	}	
	//Vector de velocidad en superficie
	function UPDATE_GPVTG(data){
	
	}	
	//Vector de velocidad en superficie
	function UPDATE_GPZDA(data){
	
	}
	function UPDATE_GPRMC(data){
		var newLL = new google.maps.LatLng(data.lat, data.lon);
		marker.setPosition(newLL);
		$('.lat span').html(data.lat);
		$('.lon span').html(data.lon);
		$('.kmh span').html(data.vel);
		
	}	



	$(document).ready(function () {
		//avisa a node.js de que hemos conectado
		socket.emit('CS_CLIENT_CONNECT','');
		
		//cargar mapa
		initialize_map();
	});
	

//

</script>

<style>

h2 {
	border-width: 10px 0 0px 10px;
	border-style: dashed;
	padding: 17px;
}

body{
	font-family:Arial;
}

.bottom_panel {
	float:left;
	/*background-color: red;*/
	height:200px;
	width:100%;
}
.left_panel {
	float:left;
	/*background-color: tomato;*/
	width:50%;
	height:400px;
	min-width:300px;
}
.right_panel {
	float:right;
	background-color: gold;
	width:100%;

	font-size:20px;
	min-width:300px;
}

#map_canvas {
	background-color:limegreen;
	display:block;
	width: 100%;
	height: 100%;

}

.left_panel div {
	display: inline-block;
	width: 28%;
	/*background-color: limeGreen;*/
	margin: 5px;
	height: 89px;
	overflow: hidden;
	border-width:0 5px 5px 0;
	border-style:dashed;
	border-color:black;
	border-radius:30px 5px;
}
.left_panel div .dato {
	font-size: 39px;
	display:block;
	float:left;
}
.left_panel div .nombre {
	width:100%;
	float:right;
	margin:5px;
	text-align:right;
}

#mlprt {
	background-image:url('./LOGOMLPRT.png');
	height:175px;
	width:550px;
	position:absolute;
	z-index:415;
}

.lat , .lon {
	
	position: absolute;
	bottom: 10px;
	color:white;
	left:10px;
}
.lat {
	bottom :35px;
}

</style>


<body>
	

	<div class="right_panel" >
		<div id="mlprt"></div>
		<div id="map_canvas"></div>
		
		<p class="lat"><b>Lat:</b> <span></span></p>
		<p class="lon"><b>Lon:</b> <span></span></p>
		
	</div>

</body>
