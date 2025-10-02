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

// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Set world bounds to prevent excessive panning
const bounds = [
  [-70, -180],  // Bottom-left (minimum latitude extent)
  [70, 180]     // Top-right (maximum latitude extent)
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

  const offsetLat = lat + distance * Math.cos(angle);
  const offsetLon = lon + distance * Math.sin(angle) / Math.cos(lat * Math.PI / 180); // Adjust for longitude scale

  return [offsetLat, offsetLon];
}

// Country coordinates for markers
const countryCoordinates = {
  'Costa Rica': [9.7489, -83.7534],
  'Kenya': [0.0236, 37.9062],
  'Thailand': [15.8700, 100.9925],
  'Singapore': [1.3521, 103.8198],
  'Namibia': [-22.9576, 18.4904],
  'Japan': [36.2048, 138.2529],
  'United Kingdom': [55.3781, -3.4360],
  'Panama': [8.5, -80.0],
  'Anguilla': [18.22, -63.05],
  'Nigeria': [9.08, 8.68]
};

// Fetch and process the points of interest data
fetch('../../map/points_of_interest.json')
  .then(response => response.json())
  .then(data => {
    // Group deployments by country
    const countryGroups = {};

    data.forEach(point => {
      const country = point.country;
      if (!countryGroups[country]) {
        countryGroups[country] = {
          deployments: [],
          totalImages: 0
        };
      }

      const imageCount = parseInt(point.image_count) || 0;
      countryGroups[country].deployments.push({
        ...point,
        imageCount: imageCount
      });
      countryGroups[country].totalImages += imageCount;
    });

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
        const thumbnailPath = deployment.thumbnail_path || '../../assets/deployments/RCH.jpg';
        const description = deployment.description || 'AMBER deployment monitoring local biodiversity and wildlife communities.';

        deploymentsHTML += `
          <div style="border-bottom: 1px solid #555; padding: 15px 0; margin-bottom: 15px; display: flex; align-items: flex-start; gap: 15px;">
            <img src="${thumbnailPath}" alt="${deployment.name}" style="width: 100px; height: 75px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">
            <div style="flex: 1;">
              <div style="font-weight: bold; color: #f8f9fa; font-size: 17px; margin-bottom: 6px;">${deployment.name}</div>
              <div style="font-size: 13px; color: #adb5bd; margin-bottom: 8px;">
                <strong>ID:</strong> ${deployment.deployment_id}<br>
                <strong>Images:</strong> ${deployment.imageCount.toLocaleString()}<br>
              </div>
              <div style="font-size: 12px; color: #ced4da; line-height: 1.4; font-style: italic;">
                ${description}
              </div>
            </div>
          </div>
        `;
      });

      const countryImage = '../../assets/deployments/RCH.jpg';      const popupContent = `
        <div style="width: 500px; max-height: 450px; overflow-y: auto; background-color: #2c3e50; border-radius: 12px; padding: 20px; position: relative;">
          <h2 style="margin: 0 0 15px 0; color: white; text-align: center; font-size: 24px; font-weight: bold;">${country}</h2>
          <img src="${countryImage}" alt="${country}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
          <div style="text-align: center; margin-bottom: 25px; padding: 15px; background: linear-gradient(135deg, #dc3545, #c82333); border-radius: 10px; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Network Overview</div>
            <div style="display: flex; justify-content: space-around; margin-top: 10px;">
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: bold;">${countryData.deployments.length}</div>
                <div style="font-size: 12px; opacity: 0.9;">Deployments</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: bold;">${countryData.totalImages.toLocaleString()}</div>
                <div style="font-size: 12px; opacity: 0.9;">Total Images</div>
              </div>
            </div>
          </div>
          <div style="font-size: 15px; color: white;">
            <h3 style="color: #f8f9fa; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #dc3545; padding-bottom: 5px;">Deployment Sites</h3>
            ${deploymentsHTML}
          </div>
        </div>
      `;

      // Add the marker to the map with popup
      marker.addTo(map)
        .bindPopup(popupContent, {
          maxWidth: 500,
          maxHeight: 'none',
          autoPan: true,
          closeOnClick: true,
          keepInView: true,
          offset: [0, 0],
          className: isOnLeftSide ? 'side-popup' : 'side-popup-left'
        });
    });
  })
  .catch(error => console.error('Error fetching points of interest:', error));
