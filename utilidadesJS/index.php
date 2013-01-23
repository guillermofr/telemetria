<!DOCTYPE html>
<html>
  <head>
  	<meta charset="utf-8">
    <title>Telemetria</title>
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="./assets/css/main.css" rel="stylesheet">
  </head>
  <body>
	<script src="./assets/js/jquery-1.8.2.min.js"></script>
	<script src="./assets/js/socket.io.js"></script>
    <script src="./assets/js/bootstrap.min.js"></script>
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
	socket.on('SC_UPDATE_GPRMC', function (data) {
		UPDATE_GPRMC(data);
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
	//informaci�n de la bater�a
	function UPDATE_PTLB(data){
		$('.v_bat').html(data.V);
		$('.i_bat').html(data.I);
		$('.temp_bat').html(data.T);
		$('.w_bat').html(parseFloat(data.V) * parseFloat(data.I));
		$('.mah_bat').html(data.mAh);
	}	
	//Informaci�n del bloqueo de sat�lites 
	function UPDATE_GPGGA(data){
		$('.dop span').html(data.dop);
		var newLL = new google.maps.LatLng(data.lat, data.lon);
		marker.setPosition(newLL);
		$('.lat span').html(data.lat);
		$('.lon span').html(data.lon);
	}
	//Informaci�n general sobre los sat�lites
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
		$('span.kmh').html(data.vel);
		
	}	



	$(document).ready(function () {
		//avisa a node.js de que hemos conectado
		socket.emit('CS_CLIENT_CONNECT','');
		
		//cargar mapa
		initialize_map();
	});
	

//

</script>


	
	<div class="left_panel"> 
		<h5>Sensores Batería</h5>
		<div>
			<span class="nombre">V Bat</span>
			<span class="dato v_bat">0.0</span> 
		</div>
		<div>
			<span class="nombre">I Bat</span>
			<span class="dato i_bat">0.0</span>  
		</div>
		<div>
			<span class="nombre">W</span>
			<span class="dato w_bat">0.0</span>  
		</div>
		<div>
			<span class="nombre">mAh</span>
			<span class="dato mah_bat">0.0</span>  
		</div>
		<div>
			<span class="nombre">Temperatura</span>
			<span class="dato temp_bat">0.0</span>  
			
		</div>
		
		<h5>Sensores Placa</h5>
		<div>
			<span class="nombre">V Placa</span>
			<span class="dato v_placa">0.0</span>  
		</div>
		<div>
			<span class="nombre">I Placa</span>
			<span class="dato i_placa">0.0</span>  
		</div>
		<div>
			<span class="nombre">W</span>
			<span class="dato w_placa">0.0</span>  
		</div>
		<div>
			<span class="nombre">mAh</span>
			<span class="dato mah_placa">0.0</span>  
		</div>
		<h5>Sensores GPS</h5>
		<div>
			<span class="nombre">kmh</span>
			<span class="dato kmh">0.0</span>  
		</div>
		<div>
			<span class="nombre">kmh media</span>
			<span class="dato kmh_media">0.0</span>  
		</div>
		<div>
			<span class="nombre">hora</span>
			<span class="dato hora">0.0</span>
		</div>
		<div>
			<span class="nombre">GPS DoP</span>
			<span class="dato dop">0.0</span>  
		</div>

	</div>
	<div class="right_panel" >
		<div id="mlprt"></div>
		<div id="map_canvas"></div>
		<p class="lat"><b>Lat:</b> <span></span></p>
		<p class="lon"><b>Lon:</b> <span></span></p>
	</div>
	<div class="bottom_panel"> 
		
	

	</div>
    
    
    
    
    
  </body>
</html>




