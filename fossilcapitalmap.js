var map = L.map('map').setView([40.7128, -74.0060], 12); // NYC coordinates and zoom level 12

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