var map = L.map('map').setView([0, 0], 2); // Centered at California and zoom level 6

// GeoJSON layer for default markers with clustering
var markers = L.markerClusterGroup({
    maxClusterRadius: 80, // Adjust this value based on your preference
    spiderfyDistanceMultiplier: 2 // Adjust this value based on your preference
});

// GeoJSON layer for red lines
var redLines = L.layerGroup(); // Initialize as an empty layerGroup

// Fetch GeoJSON data for default markers
fetch('https://aurashak.github.io/fossilcapital/gisfiles/californiamines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name); // You can customize the popup content
            }
        }).addTo(markers);

        map.addLayer(markers);
    })
    .catch(error => console.error('Error fetching GeoJSON for default markers:', error));

// Fetch GeoJSON data for red lines
fetch('https://aurashak.github.io/fossilcapital/gisfiles/naturalgaspipelines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'red',
                    weight: 2
                };
            }
        }).addTo(redLines);

        // Add redLines to map after it's defined
        map.addLayer(redLines);
    })
    .catch(error => console.error('Error fetching GeoJSON for red lines:', error));

// Satellite layer
var satelliteLayer = L.tileLayer.provider('Esri.WorldImagery');

// OSM layer
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

// Leaflet layers control
var baseLayers = {
    'Satellite': satelliteLayer,
    'OpenStreetMap': osmLayer
};

// Set maxZoom for the map
map.setMaxZoom(18); // Adjust this value based on your preference

// Overlay layers control
var overlayLayers = {
    'Default Markers': markers,
    'Red Lines': redLines
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

// Set default layers
satelliteLayer.addTo(map);
markers.addTo(map); // Add default markers by default

// Legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
        '<div style="background-color: red; width: 25px; height: 5px; display: inline-block;"></div>' +
        ' Red Lines';
    return div;
};

legend.addTo(map);
