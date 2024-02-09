





 mapboxgl.accessToken = 'pk.eyJ1IjoiYXVyYXNoayIsImEiOiJjbHNlNXoybWYxNHFsMmlxbG14bHc3NHN6In0.u9OkqM-Ip51I0R0iZvbK3Q';

    // Create a Mapbox globe
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10', // You can change the style URL
        center: [0, 0], // Initial center coordinates [longitude, latitude]
        zoom: 0, // Initial zoom level
        pitch: 45, // Tilt the globe
        bearing: -17.6 // Rotate the globe
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());