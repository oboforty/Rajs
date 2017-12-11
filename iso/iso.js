
function IsoRenderer(TW, OFFSETX, OFFSETY) {
	this.tilesets = {};
	this.TW = TW;
	this.MODs = {};
	this.OFFSETX = OFFSETX; this.OFFSETY = OFFSETY;
	this.TWs = {};
	this.ctx = null;
	//this.TWBs = {};
    this.setCtx = function(ctx) {
        this.ctx = ctx;
    }

	this.isoToScreen = function(x, y) {
		var TW = this.TW;
	    var posX = (x - y) * (TW / 2);
	    var posY = (x + y) * (TW / 4);

	    return [posX, posY];
	}

	this.screenToIso = function(posX, posY, round)
	{
		var TW = this.TW;
		posX -= this.OFFSETX;
		posY -= this.OFFSETY;
		//posY -= TW/4;
	    var x = (posX / (TW / 2) + posY / (TW / 4))/2;
	    var y = posY / (TW / 4) - x;

        if (round)
    	    return [Math.round(x), Math.round(y)];
    	else
    	    return [x, y];
	}

	this.getMousePos = function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	}

	this.loadTileset = function(name, url, TW, MOD, onLoad) {
	    var self = this;

		var img = new Image();
        img.addEventListener("load", function(){
            self.addTileset(name, img, TW, MOD);
            onLoad();
        });
        img.src = url;
	}

	this.addTileset = function(name, image, TW, MOD) {
		this.tilesets[name] = image;
		this.TWs[name] = TW;
		this.MODs[name] = MOD;
		//this.TWBs[name] = TWB;
	}

	this.drawTile = function(name, i, x,y, offX, offY) {
		var pos = this.isoToScreen(x,y);
		var M = this.MODs[name];
		var my = Math.floor(i / M), mx = i % M;
		var TWB = this.TWs[name];
		offX += this.OFFSETX;
		offY += this.OFFSETY;

		this.ctx.drawImage(
		    this.tilesets[name],
		    mx*TWB, my*TWB, TWB, TWB,
		    offX+ pos[0]-(this.TW/2), offY + pos[1]-(this.TW/2),
		    TWB, TWB
		);
	}

	this.drawLevel = function(text, x,y, offX, offY, highlight) {
		var pos = this.isoToScreen(x,y);
		var TW = this.TW;
		offX += this.OFFSETX;
		offY += this.OFFSETY;

		this.ctx.strokeStyle = "black";
		if (highlight)
			this.ctx.fillStyle = '#C9C9FF';
		else
			this.ctx.fillStyle = 'white';

		this.ctx.beginPath();
		this.ctx.arc(offX+pos[0], offY+pos[1], 9, 0,2*Math.PI);
		this.ctx.stroke();
		this.ctx.fill();

		this.ctx.font = "bold 12px Arial";
		this.ctx.lineWidth = 1;
		this.ctx.textBaseline = 'middle';
		this.ctx.textAlign = "center";

		this.ctx.fillStyle = 'black';
		this.ctx.fillText(text, offX+ pos[0], offY + pos[1]);
	}

	this.drawText = function(text, x,y, offX, offY, color, color2) {
		var pos = this.isoToScreen(x,y);
		var TW = this.TW;
		offX += this.OFFSETX;
		offY += this.OFFSETY;

		this.ctx.font = "bold 14px Arial";
		this.ctx.lineWidth = 1;
		this.ctx.textBaseline = 'middle';
		this.ctx.textAlign = "center";

		if (color2) {
            this.ctx.strokeStyle = color2;
            this.ctx.strokeText(text, offX+ pos[0], offY + pos[1]);
		}
		this.ctx.fillStyle = color;
		this.ctx.fillText(text, offX+ pos[0], offY + pos[1]);
	}

	this.drawWire = function(color, x,y, offX, offY, block) {
		offX += this.OFFSETX;
		offY += this.OFFSETY;
		var pos = this.isoToScreen(x,y);
		var Hx = this.TW/2, Hy = this.TW/4;
		var Cx = offX+pos[0], Cy = offY+pos[1];

		this.ctx.beginPath();
		this.ctx.moveTo(Cx, Cy-Hy);
		this.ctx.lineTo(Cx+Hx, Cy);
		this.ctx.lineTo(Cx, Cy+Hy);
		this.ctx.lineTo(Cx-Hx, Cy);
		this.ctx.lineTo(Cx, Cy-Hy);

		if (block) {
			this.ctx.fillStyle = color;
			this.ctx.fill();
		} else {
			this.ctx.strokeStyle = color;
			this.ctx.stroke();
		}
	}

	this.renderIsoFormat = function(map) {
	    var W = map.meta.width, H = map.meta.height,
	        T = map.meta.contentType || 'map';

	    if (map.meta.wireframe) {
	        var wire = map.meta.wireframe;
            for(var y=0; y<H; y++) for(var x=0;x<W;x++) {
                this.drawWire(wire.color||'red', x,y,wire.offsetX||0,wire.offsetY||0, wire.block||false);
            }
	    }

        for(var y=0; y<H; y++) for(var x=0;x<W;x++) {
            var tile = T == 'map' ? map.content[x+','+y] : map.content[y][x];

            if (typeof tile !== 'undefined' && tile !== null) {
                if (Array.isArray(tile)) {
                    for(var ltile of tile) {
                        ltile = ltile.split('/');
                        var type = ltile[0], id = parseInt(ltile[1]);
                        this.drawTile(type, id, x,y,0,0);
                    }
                } else {
                    tile = tile.split('/');
                    var type = tile[0], id = parseInt(tile[1]);
                    this.drawTile(type, id, x,y,0,0);
                }
            }
        }
	}
}