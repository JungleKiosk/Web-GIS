/* function full screen map view onclick */
var mapId = document.getElementById('map') /* take DOM element by id */
function fullScreenview() {
    mapId.requestFullscreen();
}
/* ------------- */
/* Print map (jquery) */
$('.print_map').click(function () {
    window.print()
})

/* the map window print is not responsive */
/* import plug-in with npm install --save leaflet.browser.print
from terminal */
/* TNKU_veryMuch✨: https://github.com/Igor-Vladyka/leaflet.browser.print */

L.control.browserPrint().addTo(map);/* it's also possibile to save map in PDF */
/* ------------- */
/* measure on map */

/* import plug-in Leaflet.Measure
from terminal */
/* TNKU_veryMuch✨: https://github.com/ptma/Leaflet.Measure*/

/* other option:
https://ppete2.github.io/Leaflet.PolylineMeasure/
*/

// add control to map
L.control.measure().addTo(map);

// using action directly
var measureAction = new L.MeasureAction(map, {
    model: "distance", // 'area' or 'distance', default is 'distance'
});
// measureAction.setModel('area');
measureAction.enable();
/* ------------- */
/* search bar Geocoder */
/* TNKU_veryMuch✨: https://github.com/perliedman/leaflet-control-geocoder */
L.Control.geocoder().addTo(map);
/* ------------- */
/* zoom to layer */
/* jquery function */
$('.zoom_to_layer').click(function () {
    map.setView([37.922060, 12.362527])
})