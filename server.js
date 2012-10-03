//SERVER NODE.JS

var io = require('socket.io');

io = io.listen(1415);
//io.set('log level', 1);

if (io.server._handle == null){
	console.log("PUERTO OCUPADO");
	process.exit(0);
}

	
	
	
	
	
//información de la batería
function UPDATE_PTLB(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_PTLB',{});
}	
//Latitud y longitud
function UPDATE_GPGLL(chunk){
	//tratar el chunk

	io.sockets.emit('SC_UPDATE_GPGLL',{lat:37.64717,lon:-1.03626});
}
//Información del bloqueo de satélites 
function UPDATE_GPGGA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPGGA',{});
}
//Información general sobre los satélites
function UPDATE_GPGSA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPGSA',{});
}	
//Vector de velocidad en superficie
function UPDATE_GPVTG(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPVTG',{});
}	
//Vector de velocidad en superficie
function UPDATE_GPZDA(chunk){
	//tratar el chunk
	
	io.sockets.emit('SC_UPDATE_GPZDA',{});
}	





io.sockets.on('connection', function(socket) { 
	
	var obj = {name : 'pepe',apellido : 'ote'};
	socket.emit('SC_test_event' , obj);

	socket.on('CS_CLIENT_CONNECT', function (data) {
		//data.socket = socket.id;
		UPDATE_GPGLL();
	});
	
});







