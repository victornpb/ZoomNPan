# ZoomNPan
Use mouse wheel to zoom an image and move the mouse to pan around. Just using vanilla javascript in 50 lines.

Check out this example
http://jsfiddle.net/Victornpb/1s3nm8h8/

Usage
----
```
var divZoom = document.getElementById('myDiv');

p = new ZoomNPan(divZoom); //Ready!
```

Options
----

- minimum zoom allowed (in percent)  
    `ZoomNPan.minScale = 30;`
    
 - maximun zoom allowed (in percent)  
   `ZoomNPan.maxScale = 300;`
    
 - Snap to 100% if the zoom is in +- this amount (in percent) 
    `ZoomNPan.snap = 9;`
    
 - invert the direction on MacOS  
    `ZoomNPan.invertOnMac = false;`
    
    
Methods
----
    
 - theardown the events and remove styles, call this when you don't need it anymore.   
    `ZoomNPan.destroy()`
