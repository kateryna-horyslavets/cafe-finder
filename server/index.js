const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Cafe Finder API is running...');
});

app.post('/api/cafes', async (req, res) => {
    const { lat, lng, radius } = req.body;
    if (!lat || !lng) return res.status(400).json({ error: 'Coordinates required' });
    
    try {
        const response = await axios.post(
            'https://places.googleapis.com/v1/places:searchNearby',
            {
                includedTypes: ['cafe'],
                maxResultCount: 20,
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: lat,
                            longitude: lng
                        },
                        radius: radius * 1000
                    }
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.id'
                }
            }
        );

        const results = response.data.places.map(place => ({
            place_id: place.id,
            name: place.displayName?.text || 'Unknown',
            vicinity: place.formattedAddress,
            geometry: {
                location: {
                    lat: place.location.latitude,
                    lng: place.location.longitude
                }
            },
            rating: place.rating,
            user_ratings_total: place.userRatingCount,
            photo_url: place.photos?.[0] 
                ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`
                : null
        }));

        res.json(results);
    } catch (error) {
        console.error('Error fetching cafes:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch cafes' });
    }
});

app.get('/api/cafe/:id', async (req, res) => {
    try {
        const response = await axios.get(
            `https://places.googleapis.com/v1/places/${req.params.id}`,
            {
                headers: {
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'displayName,formattedAddress,location,rating,userRatingCount,internationalPhoneNumber,regularOpeningHours,photos,websiteUri'
                }
            }
        );

        const place = response.data;

        const result = {
            name: place.displayName?.text,
            vicinity: place.formattedAddress,
            geometry: {
                location: {
                    lat: place.location.latitude,
                    lng: place.location.longitude
                }
            },
            rating: place.rating,
            user_ratings_total: place.userRatingCount,
            formatted_phone_number: place.internationalPhoneNumber,
            opening_hours: place.regularOpeningHours ? {
                weekday_text: place.regularOpeningHours.weekdayDescriptions
            } : null,
            photo_url: place.photos?.[0] 
                ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`
                : null
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching cafe details:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch details' });
    }
});

app.get('/api/geocode', async (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address required' });
    
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address,
                key: GOOGLE_API_KEY,
                language: 'en'
            }
        });
        
        const results = response.data.results;
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        const { lat, lng } = results[0].geometry.location;
        res.json({ lat, lng });
    } catch (error) {
        console.error('Geocoding error:', error.message);
        res.status(500).json({ error: 'Geocoding failed' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));