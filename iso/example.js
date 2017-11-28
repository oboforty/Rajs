var loaded = 0;

function generateMap(domId, map) {
    var TW = 64;
    var canvas = document.getElementById(domId);
    var renderer = new IsoRenderer(TW, TW*7 + 0.75*TW, TW);

    renderer.setCtx(canvas.getContext("2d"));
    renderer.loadTileset("mob", "img/monsters.png", 64, 8, function(){
        if (++loaded > 2) {
            renderer.renderIsoFormat(map);
        }
    });
    renderer.loadTileset("tile", "img/tiles.png", 64, 16, function(){
        if (++loaded > 2) {
            renderer.renderIsoFormat(map);
        }
    });
}
