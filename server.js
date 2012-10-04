//SERVER NODE.JS

var io = require('socket.io');
var SerialPort = require('serialport2').SerialPort;
var port = new SerialPort();

io = io.listen(1415);
//io.set('log level', 1);

if (io.server._handle == null){
	console.log("PUERTO OCUPADO");
	process.exit(0);
}




	
	
	
//información de la batería
function UPDATE_PTLB(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_PTLB',chunk);
}	
//Latitud y longitud
function UPDATE_GPGLL(chunk){
	//tratar el chunk

	io.sockets.emit('SC_UPDATE_GPGLL',chunk);
}
//Información del bloqueo de satélites 
function UPDATE_GPGGA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPGGA',chunk);
}
//Información general sobre los satélites
function UPDATE_GPGSA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPGSA',chunk);
}	
//Vector de velocidad en superficie
function UPDATE_GPVTG(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPVTG',chunk);
}	
//Vector de velocidad en superficie
function UPDATE_GPZDA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPZDA',chunk);
}
function UPDATE_GPRMC(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPRMC',chunk);
}	

port.on('data', function(data) {
  parser(data);
  //console.log("GOT: " + data.toString());
});

port.on('error', function(err) {
  console.log(err);
});

port.open('/dev/ttyACM0', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1
}, function(err) {
  // port.write("");
  // port.close();
});

function parser(str){
 		/* El checksum no va separado por , si no por * */
 		var aux = str.split("*"); /* Aux[0] = Informacion;  Aux[1]= Checksum */
 		/* Troceamos la cadena */ 
 		var n = aux[0].split(",");
 		var checksum = aux[1];
 			
		console.log(n);
		
 			if (n[0]=="$PTLB"){

				datos = {ID:n[1],
					  V:n[2],
					  I:n[3],
					  T:n[4],
					  mAh:n[5],
					  Checksum:checksum};
				UPDATE_PTLB(datos);
				console.log("TELEM: BAT");
 			}

 			if (n[0]=="$PTLP"){

				datos = {ID:n[1],
					  V:n[2],
					  I:n[3],
					  T:n[4],
					  mAh:n[5],
					  Checksum:checksum};
				console.log("TELEM: PLACA (NO IMPLEMENTADO)");

 			}


 			if (n[0]=="$GPGGA"){
 				datos = {Type:n[0],
					  Time:n[1],
					  lat:n[2],
					  latDirection:n[3],
					  lon:n[4],
					  lonDirection:n[5],
					  Quality:n[6],
					  SatelliteNumber:n[7],
					  HorizontalDilutionPosition:n[8],
					  Altitude:n[9],
					  Antennaheight:n[10],
					  Geoidalseparation:n[11],
					  GeoidalSeparation:n[12],
					  ASSLU:n[13],
					  DGPS:n[14],
					  Checksum:checksum};

 				/*
 				 
 				1    = UTC of Position
				2    = Latitude
				3    = N or S
				4    = Longitude
				5    = E or W
				6    = GPS quality indicator (0=invalid; 1=GPS fix; 2=Diff. GPS fix)
				7    = Number of satellites in use [not those in view]
				8    = Horizontal dilution of position
				9    = Antenna altitude above/below mean sea level (geoid)
				10   = Meters  (Antenna height unit)
				11   = Geoidal separation (Diff. between WGS-84 earth ellipsoid and
				       mean sea level.  -=geoid is below WGS-84 ellipsoid)
				12   = Meters  (Units of geoidal separation)
				13   = Age in seconds since last update from diff. reference station
				14   = Diff. reference station ID#
				15   = Checksum

 				 */
			
				var temp =  datos.lon;
				var lon = temp.split('.');
				var p = parseInt(lon[0]/1000);
				
				if (datos.lonDirection == 'W') p = '-'+p;
				
				var s = parseInt(lon[0]%1000);
				var c = (parseFloat(s.toString() + '.' + lon[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');

				datos.lon = r;
				
				
				var temp =  datos.lat;
				var lat = temp.split('.');
				var p = parseInt(lat[0]/100);
				var s = parseInt(lat[0]%100);
				var c = (parseFloat(s.toString() + '.' + lat[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');
				datos.lat = r;
				
				UPDATE_GPGGA(datos);
 				console.log("GPS: GPGGA");
 			}

 			
 			if (n[0]=="$GPRMC"){
 				datos = {Time:n[1],
					 lat:n[3],
					 latDirection:n[4],
					 lon:n[5],
					 lonDirection:n[6],
					 vel:(parseFloat(n[6])*1.852),
					 Checksum:checksum};
			
				var temp =  datos.lon;
				var lon = temp.split('.');
				var p = parseInt(lon[0]/1000);
				
				if (datos.lonDirection == 'W') p = '-'+p;
				
				var s = parseInt(lon[0]%1000);
				var c = (parseFloat(s.toString() + '.' + lon[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');

				datos.lon = r;
					 
				var temp =  datos.lat;
				var lat = temp.split('.');
				var p = parseInt(lat[0]/100);
				var s = parseInt(lat[0]%100);
				var c = (parseFloat(s.toString() + '.' + lat[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');
				datos.lat = r;
					
				UPDATE_GPRMC(datos);
 				console.log("GPS: GPRMC");
 			}
 			
 			if (n[0]=="$GPGSA"){
 				datos = {Type:n[0],
					 Mode:n[1],
					 Fix:n[2],
					 PRN:[n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14]],
					 PDOP:n[15],
					 HorizontalDilution:n[16],
					 VerticalDilution:n[17],
					 Checksum:checksum};
					 
 				console.log("GPS: GPGSA");

 				/*
 				1    = Mode:
		       M=Manual, forced to operate in 2D or 3D
		       A=Automatic, 3D/2D
				2    = Mode:
				       1=Fix not available
				       2=2D
				       3=3D
				3-14 = IDs of SVs used in position fix (null for unused fields)
				15   = PDOP
				16   = HDOP
				17   = VDOP
				*/
 			}

 			if (n[0]=="$GPVTG"){
 				datos = {Type:n[0],
				TrueTrack:n[1],
				MagneticTrack:n[3],
				GroundSpeedknots:n[5],
				GroundSpeedKilometers:n[7],
				Checksum:checksum};
 				console.log("GPS: GPVTG");

 				/*
 				1    = Track made good
				2    = Fixed text 'T' indicates that track made good is relative to true north
				3    = not used
				4    = not used
				5    = Speed over ground in knots
				6    = Fixed text 'N' indicates that speed over ground in in knots
				7    = Speed over ground in kilometers/hour
				8    = Fixed text 'K' indicates that speed over ground is in kilometers/hour
				9    = Checksum
				*/
 			}

 			if (n[0]=="$GPZDA"){
 				datos = {Type:n[0],
					  Hhmmss:n[1],
					  Day:n[2],
					  Month:n[3],
					  Year:n[4],
					  Xx:n[5],
					  Yy:n[6],
					  Checksum:checksum};
 				console.log("GPS: GPZDA");

 			}

 			if (n[0]=="$GPGLL"){
 				datos = {Type:n[0],
					  lat:n[1],
					  latDirection:n[2],
					  lon:n[3],
					  lonDirection:n[4],
					  Time:n[5],
					  Data:n[6],
					  Desconocido:n[7],
					  Checksum:checksum};
					  
				
				var temp =  datos.lon;
				var lon = temp.split('.');
				var p = parseInt(lon[0]/1000);
				
				if (datos.lonDirection == 'W') p = '-'+p;
				
				var s = parseInt(lon[0]%1000);
				var c = (parseFloat(s.toString() + '.' + lon[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');

				datos.lon = r;
					  
				var temp =  datos.lat;
				var lat = temp.split('.');
				var p = parseInt(lat[0]/100);
				var s = parseInt(lat[0]%100);
				var c = (parseFloat(s.toString() + '.' + lat[1])/60)*100;
				r = p + '.' + c.toString().replace('.','');
				datos.lat = r;
				
 				UPDATE_GPGLL(datos);
				console.log("GPS: GPGLL");
 			}



 	}








io.sockets.on('connection', function(socket) { 
	
	var obj = {name : 'pepe',apellido : 'ote'};
	socket.emit('SC_test_event' , obj);

	socket.on('CS_CLIENT_CONNECT', function (data) {
		//data.socket = socket.id;
		UPDATE_GPGLL();
	});
	
});







