var map = L.map('map').setView([37.7749, -122.4194], 6); // Centered at California and zoom level 6

// Purple icon
var purpleIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-purple.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// GeoJSON layer with purple markers
L.geoJSON.ajax('https://aurashak.github.io/fossilcapital/gisfiles/californiamines.geojson', {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: purpleIcon });
  }
}).addTo(map);

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

L.control.layers(baseLayers).addTo(map);

// Set default layer
satelliteLayer.addTo(map);
