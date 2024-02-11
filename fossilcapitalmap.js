var map = L.map('map').setView([0, 0], 2); // Centered at California and zoom level 6

// GeoJSON layer for yellow circles (California mines)
var yellowCircles = L.markerClusterGroup({
    maxClusterRadius: 40, // Adjust this value based on your preference
    spiderfyOnMaxZoom: true, // Display individual markers when zoomed in
    showCoverageOnHover: false, // Disable coverage on hover
    zoomToBoundsOnClick: true // Zoom to cluster bounds on click
});

// GeoJSON layer for red lines (Natural Gas Pipelines)
var redLines = L.layerGroup(); // Initialize as an empty layerGroup

// Fetch GeoJSON data for yellow circles (California mines)
fetch('https://aurashak.github.io/fossilcapital/gisfiles/californiamines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, // Adjust the radius as needed
                    color: 'yellow',
                    fillColor: 'yellow',
                    fillOpacity: 1
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name); // You can customize the popup content
            }
        }).addTo(yellowCircles);

        map.addLayer(yellowCircles);
    })
    .catch(error => console.error('Error fetching GeoJSON for yellow circles:', error));

// Fetch GeoJSON data for red lines (Natural Gas Pipelines)
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
    'Yellow Circles (Mines)': yellowCircles,
    'Red Lines (Pipelines)': redLines
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

// Set default layers
satelliteLayer.addTo(map);
yellowCircles.addTo(map); // Add yellow circles by default

// Legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
    div.innerHTML =
    '<div style="background-color: yellow; width: 25px; height: 25px; border-radius: 50%; display: inline-block; align-items: center; justify-content: center;"></div>' +
    ' California Mines' +
    '<br>' +
    '<div style="background-color: red; width: 25px; height: 5px; display: inline-block; align-items: center; justify-content: center; "></div>' +
    ' Natural Gas Pipelines';
    return div;
};

legend.addTo(map);
