



 // Initialize the map
 var map = L.map('map').setView([51.505, -0.09], 13);

 // Add a tile layer (OpenStreetMap as an example)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '© OpenStreetMap contributors'
 }).addTo(map);

 // Add a marker
 var marker = L.marker([51.505, -0.09]).addTo(map);

 // Add a popup to the marker
 marker.bindPopup("<b>Hello World!</b><br>This is a Leaflet map.").openPopup();
