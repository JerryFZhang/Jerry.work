var canvas = document.querySelectorAll('canvas')[0],
	ctx = canvas.getContext('2d'),
	arrows = [],
	ARROWS_GRID = 40;
// requestAnimationFrame polyfill
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||                      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// Mouse Class to get the mouse coordinates
var Mouse = function (el) {
	// Public Vars
	this.el		= el || window;
	this.x		= 0;
	this.y		= 0;

	/*
	*
	* Private Internal Methods
	*
	*/
	var _getPointerEvent = function(event) {
		return event.targetTouches ? event.targetTouches[0] : event;
	};
	/*
	*
	* Set the x and y values of this class according to the mouse coordinates givent to the event object
	*
	*/

	var _setMouseCoordinates = function ( e ) {

		e.preventDefault();
		var pointer = _getPointerEvent(e),
			x = pointer.pageX,
			y = pointer.pageY;

		this.x = x;
		this.y = y;
	};


	var events = "mousernter mousemove touchstart touchenter touchmove";

	// bind events
	events.split(' ').forEach(function(eventName){
		this.el.addEventListener(eventName,_setMouseCoordinates.bind(this))
	})

	return this;
}();
// Arrow Class https://github.com/lamberta/html5-animation/blob/master/examples/ch05/classes/arrow.js
var Arrow = function (o) {
	this.x = o.x | 0;
	this.y = o.y | 0;
	this.color = o.color || "#ffffff";
	this.rotation = o.rotation | 0;
	this.draw = function () {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.lineWidth = 1;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(-10, -5);
		ctx.lineTo(0, -5);
		ctx.lineTo(0, -10);
		ctx.lineTo(10, 0);
		ctx.lineTo(0, 10);
		ctx.lineTo(0, 5);
		ctx.lineTo(-10, 5);
		ctx.lineTo(-10, -5);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	};
};
/*
*
* Set the viewport size let's make it fullscreen!
*
*/
var setViewport = function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	createParticles();
};
/*
*
* Make all the arrows
*
*/
var createParticles = function () {
	arrows = [];
	var ROWS = canvas.width / ARROWS_GRID,
		COLS = canvas.height / ARROWS_GRID;
	for (var x = 0; x < ROWS; x++) {
		for (var y = 0; y < COLS; y++){
			arrows.push(new Arrow({
				x:x * ARROWS_GRID,
				y:y * ARROWS_GRID
			}));
		}
	}
};
/*
*
* Rock and roll baby!
*
*/
var loop = function (){
	render();
	window.requestAnimationFrame(loop);
};
/*
*
* Draw the arrows and clean the canvas
*
*/
var render = function () {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	[].forEach.call(arrows,function(arrow){
		arrow.rotation = Math.atan2(Mouse.y - arrow.y,Mouse.x - arrow.x);
		arrow.draw();
	});
};

// Init this shit
setViewport();
createParticles();
loop();

// UI Events
window.addEventListener('resize',setViewport,false);
