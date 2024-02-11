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

// GeoJSON layer with clustering
var markers = L.markerClusterGroup({
  maxClusterRadius: 80, // Adjust this value based on your preference
  spiderfyDistanceMultiplier: 2 // Adjust this value based on your preference
});

// Fetch GeoJSON data
fetch('https://aurashak.github.io/fossilcapital/gisfiles/californiamines.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: purpleIcon });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name); // You can customize the popup content
      }
    }).addTo(markers);

    map.addLayer(markers);
  })
  .catch(error => console.error('Error fetching GeoJSON:', error));

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
