function Ellipse(x, y, w, h, lc, fc, lw, fi, g, gradCol1, gradCol2, s) {
	if (w < 0) {
		this.x = x + w;
		this.width = -w;
	}
	else {
		this.x = x;
		this.width = w;
	}
	if (h < 0) {
		this.y = y + h;
		this.height = -h;
	}
	else {
		this.y = y;
		this.height = h;
	}
	this.lineCol = lc;
    this.lineWidth = lw;
	this.fillCol = fc;
	this.f = fi;
    this.grad = g;
    this.x2 = this.x+this.width;
    this.y2 = this.y+this.height;
    this.gradCol1 = gradCol1;
    this.gradCol2 = gradCol2;
    this.stroke = s;
    
}

Ellipse.prototype.draw = function (pen) {
	var radiusX = this.width/2
	var radiusY = this.height/2
	var centerX = this.x + radiusX;
	var centerY = this.y + radiusY;
	var rotation = 0;
	var startAngle = 0;
	var endAngle = 2 * Math.PI;
	var antiClockwise = false;
    var ctx = pen.getContext();
    ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.lineCol;
	ctx.beginPath();
	ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise);
	ctx.stroke();
	ctx.closePath();
}

Ellipse.prototype.fill = function (pen) {
    var ctx = pen.getContext();
	var radiusX = this.width/2
	var radiusY = this.height/2
	var centerX = this.x + radiusX;
	var centerY = this.y + radiusY;
	var rotation = 0;
	var startAngle = 0;
	var endAngle = 2 * Math.PI;
	var antiClockwise = false;
    ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.lineCol;
    var rad1A = Math.abs(this.width/4); // This is finding the absolute value of the width variable.
    var rad1B = Math.abs(this.width/2);
    var rad2A = Math.abs(this.height/4); // This is finding the absolute value of the height variable.
    var rad2B = Math.abs(this.height/2);       
    if (this.grad === "linear") {
        var linGrad = ctx.createLinearGradient(this.x, this.y, this.x2, this.y2);
        linGrad.addColorStop(0, this.gradCol1);
        linGrad.addColorStop(1, this.gradCol2);
        pen.setFillColor(linGrad);
    }
    else if (this.grad === "radial") {
        if (Math.abs(this.width) > Math.abs(this.height)) {
            var radGrad = ctx.createRadialGradient(centerX, centerY, rad1A, centerX, centerY, rad1B);
        }
        else {
            var radGrad = ctx.createRadialGradient(centerX, centerY, rad2A, centerX, centerY, rad2B);
        }
        radGrad.addColorStop(0, this.gradCol1);
        radGrad.addColorStop(1, this.gradCol2);
        pen.setFillColor(radGrad);
    }
    else if(this.grad === "pattern1"){
        var img = new Image();
        img.src ="img/pattern1.png";
        var pat=ctx.createPattern(img,"repeat");
        pen.setFillColor(pat);
    }
    else if(this.grad === "pattern2"){
        var img = new Image(); 
        img.src ="img/pattern2.jpg";
        var pat=ctx.createPattern(img,"repeat");
        pen.setFillColor(pat);
    }
    else {
        pen.setFillColor(this.fillCol);
        ctx.fillStyle = this.fillCol;
    }
	ctx.beginPath();
	ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise);
    if(this.stroke){
        ctx.stroke();
    }
	ctx.fill();
	ctx.closePath();
}
