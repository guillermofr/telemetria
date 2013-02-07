	// Create a Paper.js Path to draw a line into it:

	//http://jsfiddle.net/8bwG2/42/

	var circuito = [
		[37.64263089018374, -1.0313940048217773],
		[37.64293672657085, -1.0321235656738281],
		[37.64466977564717, -1.033625602722168],
		[37.64521346898597, -1.0349938893737793],
		[37.643990153377416, -1.0340118408203125],
		[37.64273283578602, -1.0329818725585938],
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
		]
		var circuito = [
[1.6884398460388184,41.5922090855108],
[1.6875600814819336,41.59211279777941],
[1.6865944862365723,41.59203255789357],
[1.685779094696045,41.59193626989887],
[1.6853070259094238,41.59183998176054],
[1.6852211952209473,41.5917115973527],
[1.6853713989257812,41.591470875899766],
[1.6857361793518066,41.5912462017338],
[1.6864442825317383,41.590780802759674],
[1.6870665550231934,41.590524029475596],
[1.6876673698425293,41.590572174544164],
[1.688075065612793,41.59074870615501],
[1.68839693069458,41.591005478545405],
[1.6887831687927246,41.591374587067264],
[1.6892766952514648,41.59167950121085],
[1.6899847984313965,41.59185602979357],
[1.6907572746276855,41.59196836591305],
[1.6913580894470215,41.59203255789357],
[1.6917657852172852,41.59195231790796],
[1.6920232772827148,41.59169554928377],
[1.6920018196105957,41.59139063521599],
[1.6915512084960938,41.59111781614504],
[1.690671443939209,41.5910536232549],
[1.689920425415039,41.590844995921096],
[1.689770221710205,41.59054007783578],
[1.6899847984313965,41.59015491609044],
[1.6903281211853027,41.589625314938345],
[1.6907787322998047,41.589480877506475],
[1.691293716430664,41.589609266350756],
[1.6917872428894043,41.58978580059475],
[1.6929244995117188,41.59017096454236],
[1.6938042640686035,41.59039564245056],
[1.6942548751831055,41.59058822289237],
[1.6946625709533691,41.59062031957681],
[1.6949844360351562,41.590524029475596],
[1.6949844360351562,41.590251206742195],
[1.694791316986084,41.590010479843464],
[1.6940832138061523,41.58940063434914],
[1.693418025970459,41.58875868549979],
[1.6926884651184082,41.588084632337925],
[1.6916370391845703,41.58705749017772],
[1.6909503936767578,41.58641551802936],
[1.6903066635131836,41.58574144040358],
[1.6896629333496094,41.585452547838194],
[1.6890192031860352,41.585452547838194],
[1.6884613037109375,41.58564514302541],
[1.6881179809570312,41.58617477682803],
[1.6878604888916016,41.58681675137013],
[1.687474250793457,41.58744267040278],
[1.6872811317443848,41.58784389736027],
[1.687324047088623,41.58798833845459],
[1.6875386238098145,41.588004387445125],
[1.6878175735473633,41.58792414245256],
[1.6888046264648438,41.587603161485],
[1.6899418830871582,41.58728217892162],
[1.6904139518737793,41.58728217892162],
[1.6908001899719238,41.58744267040278],
[1.69114351272583,41.58771550500517],
[1.6921520233154297,41.58853400189445],
[1.6929244995117188,41.589304342428676],
[1.693418025970459,41.58983394621388],
[1.6933751106262207,41.59010677071068],
[1.692967414855957,41.59092523728312],
[1.6925597190856934,41.591663453133926],
[1.692495346069336,41.592225133452054],
[1.6923236846923828,41.59254609143957],
[1.6920018196105957,41.59262633068709],
[1.6908860206604004,41.592497947843164],


	]
	/*var height = 400;
	var width = 400;*/

	function initialize(){

		m1 = drawMap(circuito,600,440);

		m1.setPoint(circuito[3][0],circuito[3][1],5);

	}



	function drawMap(circuito,w,h){

		var i = 0;
		var circle;


		if (w>h)
			var margin = h/20;
		else
			var margin = w/20;

		var med_lat,med_lon,max_distance = 0;
		var min_lon,max_lon,min_lat,max_lat;
		var mapLonDelta;
		
		var map_frame,map_ratio;
		
		
		var mid_x_pos = w /2;
		var mid_y_pos = h /2;
		
		var pi = 3.14159265358979323846;
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
	
		function geopoint(lat,lon){

			if (frame_ratio < 1){
				new_height = w / map_ratio;
				y = ((lat - min_lat) * new_height)/(max_lat - min_lat);
				x = margin+((lon - min_lon) * w)/(max_lon - min_lon);
				y = Math.abs(y-new_height);
				y += margin+(h - new_height)/2;
				
			} else {
				new_width = h / map_ratio;
				y = ((lat - min_lat) * h)/(max_lat - min_lat);
				x = ((lon - min_lon) * new_width)/(max_lon - min_lon);
				y = margin+Math.abs(y-h);
				x += margin+(w - new_width)/2;
				
			}
			return new Point(x,y);
		}

		function drawPolyline(poly,strokeWidth,strokeColor){
	    	var path = new Path();
	    	var start;
	    	path.strokeColor = strokeColor;
	    	path.strokeWidth = strokeWidth;
	    	for (i = 0; i < poly.length; i++){
	        	if (i == 0){
	        		start = geopoint(poly[i][0],poly[i][1]);
	        		path.moveTo(start);
	        		console.log('primero');
	        	} else {
	        		path.lineTo(geopoint(poly[i][0],poly[i][1]));
	        	}
	        	//console.log(geopoint(poly[i][0],poly[i][1]));
	        }	
	    	//path.lineTo(start);
	    	path.closePath();
	    	path.smooth();
	    	
	    }


	    //main
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
        frame_ratio =( w )/( h );
        

        
        //frame(width,height);
        drawPolyline(circuito,margin,'#444');
        drawPolyline(circuito,margin-2,'#222');
        
        circle = new Path.Circle(geopoint(circuito[1][0],circuito[1][1]), 8);
        circle.fillColor = 'red';

        function setPoint(lat,lon,size){
        	if (circle) circle.remove();
        	circle = new Path.Circle(geopoint(lat,lon),margin/2);
        	circle.fillColor = 'yellow';
        	
        }


        return {setPoint : setPoint}

	}


    
    initialize();



function onKeyDown(event) {
    // When a key is pressed, set the content of the text item:
    m1.setPoint(circuito[event.key][0],circuito[event.key][1]);
}

   
    
    