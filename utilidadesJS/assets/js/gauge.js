	// Create a Paper.js Path to draw a line into it:

	//http://jsfiddle.net/8bwG2/42/

	function initialize(){

        //drawGauge(min,max,value,width,height,x,y)
        g1 = drawGauge(0,100,20,200,100,0,0);
        g2 = drawGauge(0,200,60,200,100,200,0);
        g3 = drawGauge(0,300,160,200,100,400,0);
        g4 = drawGauge(0,400,360,200,100,600,0);
        g5 = drawGauge(20,40,31,200*4,100*4,0,100);

	}
	

 


    function drawGauge(min,max,fase,w,h,x,y){

    	var stroke = w/6;

    	var start = new Point(stroke + x, h + y);
		var through = new Point(w/2	  + x 	, stroke	+ y);
		var to = new Point(	w -stroke + x 	, 	h	+ y);
		
		var path = new Path.Arc(start, through, to);
		path.strokeColor = '#444';
		path.strokeWidth = stroke;

		//indicator

		/*var offset = path.length * pc;
		var point = path.getPointAt(offset);
		var circle = new Path.Circle(point, w/10);
		circle.fillColor = 'red';*/

		var calculate2points = function(f){
			fase_t = f - min; //50
	    	max_t = max - min; //200

	    	console.log(fase_t,max_t,(fase_t * 100 / max_t));

	    	pc = (fase_t * 100 / max_t) /100;

			var offset1 = path.length * pc;
			var point1 = path.getPointAt(offset1);
			/*var circle = new Path.Circle(point1, w/10);
			circle.fillColor = 'yellow';*/
			var offset2 = path.length * pc/2;
			var point2 = path.getPointAt(offset2);
			/*var circle = new Path.Circle(point2, w/10);
			circle.fillColor = 'red';*/

			var start_m = new Point(stroke + x, h + y);
			var through_m = point2;
			var to_m = point1;

			return {through:point2,to:point1,pc:pc}
		}

		points = calculate2points(fase);

		var start_m = new Point(stroke + x, h + y);
		var through_m = points.through;
		var to_m = points.to;
		
		var path_m = new Path.Arc(start_m, through_m, to_m);
		path_m.strokeColor = 'red';
		path_m.strokeWidth = stroke*2/3;
		path_m.strokeColor.hue += points.pc*130;


		//label
		var text = new PointText(new Point(w/2 +x, h+y));
		text.justification = 'center';
		text.fillColor = '#777';
		text.fontSize = stroke*2/3;
		text.content = fase;

		var change = function(f){
			console.log('funciona',f);
			text.content = f;

			points = calculate2points(f);
			save_color = path_m.strokeColor;
			path_m.remove();
			path_m = new Path.Arc(start_m, points.through,points.to);
			path_m.strokeColor = 'red';
			path_m.strokeWidth = stroke*2/3;
			path_m.strokeColor.hue += points.pc*130;

		}

		return {change:change};

    }
    
    initialize();



function onKeyDown(event) {
    // When a key is pressed, set the content of the text item:
    g1.change(event.key*10);
}

 
    
    