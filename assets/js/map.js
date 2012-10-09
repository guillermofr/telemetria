	// Create a Paper.js Path to draw a line into it:

	//http://jsfiddle.net/8bwG2/42/


	var margin = 10;
	var max_size = 0;  //metros de distancia

	var height = 300;
	var width = 600;
	
	var med_lat,med_lon,max_distance = 0;
	var min_lon,max_lon,min_lat,max_lat;
	var mapLonDelta;
	
	var map_frame,map_ratio;
	
	
	var mid_x_pos = width /2;
	var mid_y_pos = height /2;
	
	var pi = 3.14159265358979323846;
	
	
	var circuito = [
		[37.64232505253773, -1.0335183143615723],
		[37.64757509073912, -1.0380673408508],
		[37.649155126675964, -1.0324454307556152],
		[37.647931875985584, -1.0307502746582031],
		[37.64251195347119, -1.0309648513793945],
		[37.64232505253773, -1.0335183143615723],
	]
	
	
	var circuito = [
		[37.642426998559465, -1.0332393646240234],
		[37.647456161942515, -1.0375308990478516],
		[37.64789789651191, -1.0371017456054688],
		[37.64711636433215, -1.0362863540649414],
		[37.64786391702292, -1.0349130630493164],
		[37.64871339958385, -1.0331106185913086],
		[37.64779595799829, -1.0310077667236328],
		[37.647388202544796, -1.0316085815429688],
		[37.64779595799829, -1.0333681106567383],
		[37.647150344163144, -1.035299301147461],
		[37.64670860514769, -1.0352134704589844],
		[37.64599502118836, -1.0336685180664062],
		[37.64619890301915, -1.0327672958374023],
		[37.645825119235205, -1.0321664810180664],
		[37.64426200303151, -1.0325956344604492],
		[37.64286876303809, -1.0310077667236328],
		[37.64263089018374, -1.0313940048217773],
		[37.64293672657085, -1.0321235656738281],
		[37.64466977564717, -1.033625602722168],
		[37.64521346898597, -1.034998893737793],
		[37.643990153377416, -1.0340118408203125],
		[37.64273283578602, -1.0329818725585938],
		[37.642426998559465, -1.0332393646240234]
	]
	
	
	//util functions
	 
	if (typeof(Number.prototype.toRad) === "undefined") {
	  Number.prototype.toRad = function() {
		  return this * Math.PI / 180;
	  }
	}
	
	function distance2p(lat1,lon1,lat2,lon2){
		var R = 6371; // km
        var dLat = parseFloat(lat2-lat1).toRad();
        var dLon = parseFloat(lon2-lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
	     return d;
	}
	
	//main
	
	function initialize(){
		
		med_lat = med_lon = 0;
		min_lon = 0;
		max_lon = 0;
		min_lat = 0;
		max_lat = 0;

        for (i = 0; i < circuito.length; i++){
        	med_lat = med_lat + circuito[i][0];
        	med_lon = med_lon + circuito[i][1];
        	if (i == 0){
        		min_lon = max_lon = med_lon;
        		min_lat = max_lat = med_lat;
        	} else {
        		if (circuito[i][1] < min_lon){
        			min_lon = circuito[i][1];
        		}
				if (circuito[i][1] > max_lon){
					max_lon = circuito[i][1];			
				}
				if (circuito[i][0] < min_lat){
					min_lat = circuito[i][0];
				}
				if (circuito[i][0] > max_lat){
					max_lat = circuito[i][0];
				}
        	}
        	
        	
        }
        med_lat = med_lat / circuito.length;
        med_lon = med_lon / circuito.length;
        
        mapLonDelta = max_lon - min_lon;
        min_latDegree = min_lat * pi / 180;
        
        map_ratio =( max_lon - min_lon )/( max_lat - min_lat );
        frame_ratio =( width )/( height );
        
        
        
       /* max_distance = 0;
        for (i = 0; i < circuito.length; i++){
        	temp_distance = distance2p(med_lat,med_lon,circuito[i][0],circuito[i][1]);
        	if (temp_distance > max_distance){
        		max_distance = temp_distance;
        	}
        }*/

        frame(width,height);
        drawPolyline(circuito);
	}

	
	//width = 1500;
	//height = 1577;

	//min_lon = 9.8;
	//max_lon = 10.2;
	//mapLonDelta = max_lon - min_lon;

	//min_lat = 53.45;
	//min_latDegree = min_lat * pi / 180;

	
	function geopoint_(lat,lon){
		    x = (lon - min_lon) * (width / mapLonDelta);
		    lat = lat * pi / 180;
		    worldMapWidth = ((width / mapLonDelta) * 360) / (2 * pi);
		    mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(min_latDegree)) / (1 - Math.sin(min_latDegree))));
		    y = height - ((worldMapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY);
		    return new Point(x, y);
	}
	
	function geopoint(lat,lon){

		if (frame_ratio < 1){
			new_height = width / map_ratio;
			y = ((lat - min_lat) * new_height)/(max_lat - min_lat);
			x = ((lon - min_lon) * width)/(max_lon - min_lon);
			y = Math.abs(y-new_height);
			y += (height - new_height)/2;
			
		} else {
			new_width = height / map_ratio;
			y = ((lat - min_lat) * height)/(max_lat - min_lat);
			x = ((lon - min_lon) * new_width)/(max_lon - min_lon);
			y = Math.abs(y-height);
			x += (width - new_width)/2;
			
		}
		
		return new Point(x,y);
	}

	
	
    function frame(w,h){
    	var path = new Path();
        path.strokeColor = 'black';
        var start = new Point(0, 0);
        path.moveTo(start);
       
        path.lineTo(start + [ w, 0 ]);
        path.lineTo(start + [ w, h ]);
        path.lineTo(start + [ 0, h ]);
        path.lineTo(start + [ 0, 0 ]);

        
    	var path = new Path();
        path.strokeColor = 'red';
        var start = geopoint(min_lat,min_lon);
        path.moveTo(start);
       
        path.lineTo(geopoint(min_lat,max_lon));
        path.lineTo(geopoint(max_lat,max_lon));
        path.lineTo(geopoint(max_lat,min_lon));
        path.lineTo(start);

        return true;
        
        
        
    }
    

    function drawPolyline(poly){
    	var path = new Path();
    	var start;
    	path.strokeColor = 'gray';
    	path.strokeWidth = 10;
    	for (i = 0; i < poly.length; i++){
        	if (i == 0){
        		start = geopoint(poly[i][0],poly[i][1]);
        		path.moveTo(start);
        		console.log('primero');
        	} else {
        		path.lineTo(geopoint(poly[i][0],poly[i][1]));
        	}
        	console.log(geopoint(poly[i][0],poly[i][1]));
        }	
    	path.lineTo(start);
    	path.smooth();
    	
    }
    

    
    initialize();

    //pointPosition(1,1);
   
    
    