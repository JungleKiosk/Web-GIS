 /* ------------- */
    /* create a map in the 'map' div, add tiles of our choice, and then add a marker with some text in a popup */
    /* map class initialize */
    var map = L.map('map').setView([37.922060, 12.362527], 13);
    /* ------------- */
    /* position zoomControl */
    map.zoomControl.setPosition("topright")
    /* ------------- */
    /* adding tilelayer */ 
    /* https://leaflet-extras.github.io/leaflet-providers/preview/ */

    /* OMS */
    var oms = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /* TopoMap */
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    /* CyclOSM */
    var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    /* ------------- */
    /* adding marker in the center of map */
    var refMarker = L.marker([37.922060, 12.362527])
        .bindPopup('Cala Rossa <br> My favorite place')
        .openPopup();
    /* ------------- */
    /* add map scale: down on left on page = scale({position: "bottomright"})*/
    L.control.scale().addTo(map)
    /* ------------- */
    /* function full screen map view onclick */
    var mapId = document.getElementById('map') /* take DOM element by id */
    function fullScreenview(){
        mapId.requestFullscreen();
    }
    /* ------------- */
    /* map coordinate display (jquery) */
    map.on('mousemove',function(e){
        /* console.log(e); */
        /* by moving the mouse on the map page,
        the JS objects containing the geographical
        coordinates will appear in the console */
        $('.lat').html(`lat: ${e.latlng.lat}`)/* backtick to template literal */
        $('.lng').html(`lng: ${e.latlng.lng}`)/* backtick to template literal */
    })
    /* ------------- */
    /* Print map (jquery) */
    $('.print_map').click(function(){
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
    /* Load geoJSON from data file JS */
    var marker = L.markerClusterGroup();

    var taji = L.geoJSON(data, {
        onEachFeature: function(features, layer){
            layer.bindPopup()
        }
    });

    taji.addTo(marker);
    /* marker.addTo(map); */
    /* ------------- */
    /* search bar Geocoder */
    /* TNKU_veryMuch✨: https://github.com/perliedman/leaflet-control-geocoder */
    L.Control.geocoder().addTo(map);
    /* ------------- */
    var baseMaps = {
        'OMS': oms,
        'TopoMap': OpenTopoMap,
        'CyclOSM': CyclOSM,
    }

    var overLayMaps = {
        'GeoJSON_Markers': marker,
        'Reference_Marker': refMarker,
    }
    
    L.control.layers(baseMaps, overLayMaps).addTo(map)
    /* ------ */
    /* zoom to layer */
    /* jquery function */
    $('.zoom_to_layer').click(function(){
        map.setView([37.922060, 12.362527])
    })