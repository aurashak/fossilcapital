var map = L.map('map').setView([0, 0], 2); // Centered at [0, 0] and zoom level 2

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
