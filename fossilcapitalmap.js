



  
// Initialize the map
var map = L.map('map').setView([40.7128, -74.0060], 12); // NYC coordinates and zoom level 12
    
// Add a tile layer (OpenStreetMap as an example)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a satellite tile layer (Esri World Imagery)
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

// Load GeoJSON data from URL
L.geoJSON.ajax('https://aurashak.github.io/fossilcapital/mines.geojson', {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: greenIcon });
    }
}).addTo(map);