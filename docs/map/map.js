// Add custom CSS for side popup
const style = document.createElement('style');
style.textContent = `
  .side-popup .leaflet-popup-content-wrapper {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    margin: 0;
    position: relative;
  }

  .side-popup .leaflet-popup-content-wrapper::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid #2c3e50;
    z-index: 1001;
  }

  .side-popup .leaflet-popup-tip {
    display: none !important;
  }

  .side-popup .leaflet-popup-content {
    margin: 0;
    padding: 0;
  }

  .side-popup.leaflet-popup {
    margin-bottom: 0;
    margin-left: 15px;
  }

  .side-popup .leaflet-popup-tip-container {
    display: none !important;
  }

  /* Left-opening popup styles */
  .side-popup-left .leaflet-popup-content-wrapper {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    margin: 0;
    position: relative;
  }

  .side-popup-left .leaflet-popup-content-wrapper::before {
    content: '';
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid #2c3e50;
    z-index: 1001;
  }

  .side-popup-left .leaflet-popup-tip {
    display: none !important;
  }

  .side-popup-left .leaflet-popup-content {
    margin: 0;
    padding: 0;
  }

  .side-popup-left.leaflet-popup {
    margin-bottom: 0;
    margin-right: 15px;
  }

  .side-popup-left .leaflet-popup-tip-container {
    display: none !important;
  }
`;
document.head.appendChild(style);

// Initialize the map and fit it to the entire world
const map = L.map('map', {
  minZoom: 1,  // Allow zooming out to see the full world
  maxZoom: 19
});

// Define world-spanning bounds (full width, full height)
const bounds = [
  [-30, -180], // Bottom-left (maximum latitude extent)
  [70, 180]    // Top-right (maximum latitude extent)
];

map.fitBounds(bounds); // Fit the map to the bounds

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Function to determine marker color based on image_count
function getColor(imageCount) {
    if (imageCount === 0) {
      return 'rgb(128,128,128)'; // Grey for zero images
    }

    // Normalize the image count to a range of 0 to 1
    const maxImages = 100000; // Upper bound for image_count
    const normalized = Math.min(imageCount / maxImages, 1);

    // Interpolate between light and dark colours
    const lightColour = { r: 242, g: 87, b: 118 }; // rgb(173,216,230)
    const darkColour = { r: 89, g: 0, b: 18 }; // rgb(0,0,139)

    // Calculate the interpolated color
    const r = Math.floor(lightColour.r + normalized * (darkColour.r - lightColour.r));
    const g = Math.floor(lightColour.g + normalized * (darkColour.g - lightColour.g));
    const b = Math.floor(lightColour.b + normalized * (darkColour.b - lightColour.b));

    return `rgb(${r},${g},${b})`; // Return the interpolated color
  }


// Function to determine marker size based on image_count
function getRadius(imageCount) {
  const minRadius = 3; // Minimum marker size (visible for 0 images)
  const maxRadius = 10; // Maximum marker size
  const maxImages = 100000; // Upper bound for image_count

  // Normalize the image count to a range of 0 to 1
  const normalized = Math.min(imageCount / maxImages, 1);

  // Scale radius between minRadius and maxRadius
  return minRadius + normalized * (maxRadius - minRadius);
}

// Offset the marker positions randomly within a specified radius
function addRandomOffset(lat, lon, radiusInMeters = 1000) {
  const radiusInDegrees = radiusInMeters / 111320; // Rough conversion for latitude
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusInDegrees;

  const deltaLat = distance * Math.cos(angle);
  const deltaLon = distance * Math.sin(angle) / Math.cos(lat * Math.PI / 180); // Adjust for longitude shrinking toward poles

  return [lat + deltaLat, lon + deltaLon];
}

// Fetch points of interest from the JSON file
fetch('points_of_interest.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load points_of_interest.json');
    }
    return response.json();
  })
  .then(data => {
    // Group deployments by country
    const countryGroups = {};

    data.forEach(point => {
      const { name, image_count, country, deployment_id } = point;

      if (!countryGroups[country]) {
        countryGroups[country] = {
          deployments: [],
          totalImages: 0
        };
      }

      const imageCount = parseInt(image_count, 10) || 0;
      countryGroups[country].deployments.push({
        name,
        deployment_id,
        imageCount
      });
      countryGroups[country].totalImages += imageCount;
    });

    // Define country coordinates (approximate centers)
    const countryCoordinates = {
      'United Kingdom': [54.5, -2.5],
      'Singapore': [1.35, 103.8],
      'Kenya': [-1.0, 37.0],
      'Thailand': [13.7, 100.5],
      'Costa Rica': [9.7, -84.0],
      'Panama': [9.0, -79.5],
      'Japan': [36.0, 138.0],
      'Namibia': [-22.0, 17.0],
      'Anguilla': [18.22, -63.05],
      'Nigeria': [9.08, 8.68]
    };

    // Create markers for each country
    Object.keys(countryGroups).forEach(country => {
      const countryData = countryGroups[country];
      const coordinates = countryCoordinates[country];

      if (!coordinates) return; // Skip if coordinates not defined

      // Determine if marker is on left or right side of map
      const mapCenter = map.getCenter();
      const isOnLeftSide = coordinates[1] < mapCenter.lng;

      // Create country marker
      const marker = L.circleMarker(coordinates, {
        radius: 15,
        color: getColor(countryData.totalImages),
        fillColor: getColor(countryData.totalImages),
        fillOpacity: 0.8,
        weight: 3
      });

      // Create popup content with all deployments
      let deploymentsHTML = '';
      countryData.deployments.forEach(deployment => {
        deploymentsHTML += `
          <div style="border-bottom: 1px solid #555; padding: 12px 0; margin-bottom: 12px; display: flex; align-items: center; gap: 15px;">
            <img src="../assets/deployments/RCH.jpg" alt="${deployment.name}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 6px; flex-shrink: 0;" onerror="this.style.display='none'">
            <div style="flex: 1;">
              <div style="font-weight: bold; color: #f8f9fa; font-size: 16px; margin-bottom: 4px;">${deployment.name}</div>
              <div style="font-size: 13px; color: #adb5bd;">
                <strong>ID:</strong> ${deployment.deployment_id}<br>
                <strong>Images:</strong> ${deployment.imageCount.toLocaleString()}
              </div>
            </div>
          </div>
        `;
      });

      const popupContent = `
        <div style="width: 900px; height: calc(100vh - 120px); overflow-y: auto; background-color: #2c3e50; border-radius: 10px; padding: 15px; position: relative;">
          <h2 style="margin: 0 0 15px 0; color: white; text-align: center; font-size: 22px; font-weight: bold;">${country}</h2>
          <img src="../assets/deployments/RCH.jpg" alt="${country}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;" onerror="this.style.display='none'">
          <div style="text-align: center; margin-bottom: 20px; padding: 12px; background-color: #667eea; border-radius: 8px; color: white;">
            <strong style="font-size: 16px;">Total Deployments:</strong> ${countryData.deployments.length}<br>
            <strong style="font-size: 16px;">Total Images:</strong> ${countryData.totalImages.toLocaleString()}
          </div>
          <div style="font-size: 15px; color: white; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            ${deploymentsHTML}
          </div>
        </div>
      `;

      // Add the marker to the map with popup
      marker.addTo(map)
        .bindPopup(popupContent, {
          maxWidth: 1000,
          maxHeight: 'none',
          autoPan: false,
          closeOnClick: true,
          keepInView: false,
          offset: isOnLeftSide ? [470, Math.floor(window.innerHeight * 0.5)] : [-470, Math.floor(window.innerHeight * 0.5)],  // Fixed offset to keep top of popup visible
          className: isOnLeftSide ? 'side-popup' : 'side-popup-left'
        });
    });
  })
  .catch(error => console.error('Error fetching points of interest:', error));



