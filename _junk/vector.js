function Vector(x, y) {
	if (typeof x === "number") {
		this.x = x || 0;
		this.y = y || 0;
	} else if (typeof y === "undefined") {
		this.x = x[0];
		this.y = x[1];
	}
}

/* INSTANCE METHODS */

Vector.prototype = {
	neg: function() {
		var v = this.clone();

	vx = -v.x;
		v.y = -v.y;
		return v;
	},
	add: function(c) {
		var v = this.clone();
		if (c instanceof Vector) {
			v.x += c.x;
			v.y += c.y;
		} else {
			v.x += c;
			v.y += c;
		}
		return v;
	},
	sub: function(c) {
		var v = this.clone();

		if (c instanceof Vector) {
			v.x -= c.x;
			v.y -= c.y;
		} else {
			v.x -= c;
			v.y -= c;
		}
		return v;
	},
	mul: function(c) {
		var v = this.clone();
		if (c instanceof Vector) {
			v.x *= c.x;
			v.y *= c.y;
		} else {
			v.x *= c;
			v.y *= c;
		}
		return v;
	},
	div: function(c) {
		var v = this.clone();

		if (c instanceof Vector) {
			if(v.x != 0) v.x /= c.x;
			if(v.y != 0) v.y /= c.y;
		} else {
			if(v != 0) {
				v.x /= c;
				v.y /= c;
			}
		}
		return v;
	},
	equals: function(c) {
		var v = this.clone();

		return v.x == c.x && v.y == c.y;
	},
	dot: function(c) {
		var v = this.clone();

		return v.x * v.x + v.y * v.y;
	},
	cross: function(c) {
		var v = this.clone();

		return v.x * v.y - v.y * v.x
	},
	length: function() {
		var v = this.clone();

		return Math.sqrt(v.dot(this));
	},
	norm: function() {
		var v = this.clone();

		return v.div(v.length());
	},
	dist: function(v) {
	    return this.sub(v).length();
	},
	min: function() {
		var v = this.clone();

		return Math.min(v.x, v.y);
	},
	max: function() {
		var v = this.clone();

		return Math.max(v.x, v.y);
	},
	toAngles: function() {
		var v = this.clone();

		return -Math.atan2(-v.y, v.x);
	},
	angleTo: function(a) {
		var v = this.clone();

		return Math.acos(v.dot(a) / (v.length() * a.length()));
	},




	dd: function(){
		console.log(this.x + "," + this.y);
	},
	clone: function(){
		return new Vector(this.x, this.y);
	},
	arr: function() {
		return [this.x, this.y];
	},
	set: function(x, y) {
		var v = this.clone();

		v.x = x; v.y = y;
		return v;
	},
};