var myOptions = {
  center: new google.maps.LatLng(-25,177.5),
  zoom: 3,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};

var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON ]
      },
      polylineOptions: {
        strokeWeight: 2,
        strokeColor: '#ee9900',
        clickable: false,
        zIndex: 1,
        editable: false
      },
      polygonOptions: {
        editable:false
      }
    });

    var map;

      function initialize() {

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        google.maps.event.addListener(map, 'click', function(event) {
          alert(event.latLng);
        });


        drawingManager.setMap(map);
 
        google.maps.event.addDomListener(drawingManager, 'markercomplete', function(marker) {
          document.getElementById("action").value += "#marker\n";
          document.getElementById("action").value += marker.getPosition() + "\n";
        });

        google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function(line) {
            path = line.getPath();
            document.getElementById("action").value += "var circuito = [\n";
            for(var i = 0; i < path.length; i++) {
              document.getElementById("action").value += '['+ path.getAt(i).lng() + ',' +path.getAt(i).lat() + '],\n';
            }
             document.getElementById("action").value += "]";
console.log(path);                                    
        });

        google.maps.event.addDomListener(drawingManager, 'polygoncomplete', function(polygon) {
            path = polygon.getPath();
            document.getElementById("action").value += "#polygon\n";
            for(var i = 0; i < path.length; i++) {
              document.getElementById("action").value += '['+ path.getAt(i).lng() + ',' +path.getAt(i).lat() + '],\n';
            }
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);
      google.maps.event.addDomListener(document.getElementById("map_canvas"), 'ready', function() { drawingManager.setMap(map) } );
