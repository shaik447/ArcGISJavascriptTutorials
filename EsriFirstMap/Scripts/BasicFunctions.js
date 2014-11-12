var map;
require(["esri/map",
    "esri/geometry/Point",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/on", "dojo/dom", "dojo/domReady!"],

    function (Map,
        Point,
        SpatialReference,
        Extent,
        ArcGISDynamicMapServiceLayer,
        on, dom) {
    map = new Map("mapDiv", { basemap: "hybrid" });

    //zoom to point or center the map to a point and zoom
    on(dom.byId("centerMapBtn"), "click", function(evt) {
        var mapPoint = new Point(-24.47, 46.67, map.spatialReference);
        //zoom level 4. To zoom more increase the number
        map.centerAndZoom(mapPoint, 4);
    });

    //zoom to level 8
    on(dom.byId("zoomMapBtn"), "click", function (evt) {
        map.setZoom(8);
    });

    //get extent
    on(dom.byId("getExtentBtn"), "click", function (evt) {
        var extent = map.extent;
        console.log(extent);
    });

    //zoom to extent
    on(dom.byId("zoomtoExtentBtn"), "click", function (evt) {
        var xmax = 13402307.371646184,
            xmin = 4009725.335966225,
            ymax = 4919073.789258489,
            ymin = 1181608.8542275047;
        var extent = new Extent(xmin, ymin, xmax, ymax, map.spatialReference);
        map.setExtent(extent);
    });

    //change basemap
    on(dom.byId("basemapBtn"), "click", function (evt) {
        //change basemap to openstreet map
        //Valid values are: "streets" , "satellite" , "hybrid", "topo", "gray", "oceans", "national-geographic", and "osm"
        var basemap = map.getBasemap();
        if (basemap == "hybrid") {
            map.setBasemap("osm");
        } else {
            map.setBasemap("hybrid");
        }
        
    });

    //add a dynamic map service layer to the map
    on(dom.byId("addLayerBtn"), "click", function (evt) {
        
        var dynamicMSLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer",{id:"UsaLayer"});
        map.addLayer(dynamicMSLayer);
    });

    //get Layers
    on(dom.byId("getLayersBtn"), "click", function (evt) {
        //to get all layers
        var layerids = map.layerIds;

        //to get specific layer
        var usalayer = map.getLayer("UsaLayer");
        var layerInfos = usalayer.layerInfos;
        console.log(layerInfos);
    });



});