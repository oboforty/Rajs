
function gps2merc(lon, lat) {
    if (!lat) {
        var lat = lon[1];
        lon = lon[0];
    }
    return ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
}

function merc2gps(lon, lat) {
    if (!lat) {
        var lat = lon[1];
        lon = lon[0];
    }

    return ol.proj.transform([lon, lat], 'EPSG:3857', 'EPSG:4326');
}
