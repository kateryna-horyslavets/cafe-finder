const API_URL = 'http://localhost:5000/api';

export const getNearbyCafes = async (lat, lng, radius) => {
    const response = await fetch(`${API_URL}/cafes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, radius }),
    });
    return await response.json();
};

export const getCafeDetails = async (placeId) => {
    const response = await fetch(`${API_URL}/cafe/${placeId}`);
    return await response.json();
};

export const geocodeAddress = async (address) => {
    const response = await fetch(`${API_URL}/geocode?address=${encodeURIComponent(address)}`);
    return await response.json();
};