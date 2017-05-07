/**
 * Mouse Zoom and Pan, vanilla javascript
 * @author Victor N. wwww.victorborges.com
 * @date   2017-05-07
 *
 * @see https://github.com/victornpb/ZoomNPan/
 * @example http://jsfiddle.net/Victornpb/1s3nm8h8/
 */
function ZoomNPan(elm) {
    var that = this;

    /** minimum zoom allowed (in percent) */
    this.minScale = 30;
    /** maximun zoom allowed (in percent) */
    this.maxScale = 300;
    /** Snap to 100% if the zoom is in +- this amount (in percent) */
    this.snap = 9;    
    /** invert the direction on MacOS */
    this.invertOnMac = false;
    
    if(elm.hasAttribute('data-zoom-and-pan')) return console.error('ZoomNPan This element is already initialized');
    elm.setAttribute('data-zoom-and-pan', '');

    var currentScale = 100;
    elm.addEventListener('wheel', zoom);
    elm.addEventListener('mousemove', pan);

    function zoom(e) {
        e.preventDefault();
        var y = normalizeWheel(e);

        var step = y * (that.maxScale / 500);
        currentScale += step * -1;
        if (currentScale > that.maxScale) currentScale = that.maxScale;
        if (currentScale < that.minScale) currentScale = that.minScale;

        var s = Math.abs(100 - currentScale) > that.snap ? currentScale : 100; //snap to 100%
        elm.classList.toggle('zoomed-in', s > 100);
        elm.classList.toggle('zoomed-out', s < 100);
        elm.style.backgroundSize = s + '%';
    }

    function pan(e) {
        var panX, panY, pad = 20;
        if (currentScale >= 100) {
            panX = (e.offsetX - pad) / (e.target.clientWidth - (pad * 2));
            panY = (e.offsetY - pad) / (e.target.clientHeight - (pad * 2));
        }
        else {
            panX = 0.5;
            panY = 0.5;
        }
        elm.style.backgroundPositionX = (panX * 100) + '%';
        elm.style.backgroundPositionY = (panY * 100) + '%';
    }

    function normalizeWheel(ev) {
        var sY = 0;
        if ('detail' in ev) sY = ev.detail;
        if ('wheelDelta' in ev) sY = -ev.wheelDelta / 120;
        if ('wheelDeltaY' in ev) sY = -ev.wheelDeltaY / 120;
        var pY = 10 * sY;
        if ("deltaY" in ev) pY = ev.deltaY;
        if (pY && ev.deltaMode) pY *= (ev.deltaMode === 1) ? 40 : 800;
        if (pY && !sY) sY = 1 > pY ? -1 : 1;
        that.invertOnMac && navigator.platform.match(/mac/i) && (sY *= -1, pY *= -1); //invert direction on MacOS
        return pY;
    }
    
    /**
     * theardown the events and remove styles, call this when you don't need it anymore.
     * @public
     */
    this.destroy = function() {
        elm.removeEventListener('wheel', zoom);
        elm.removeEventListener('mousemove', pan);
        elm.removeAttribute('data-zoom-and-pan');
        elm.className = 'zoom'; //remove zoomed-in and zoomed-out
        elm.style.backgroundSize = ''; //reset zoom
        elm.style.backgroundPosition = ''; //reset position
    };
}
