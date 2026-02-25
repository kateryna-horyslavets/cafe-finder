# ☕ Cafe Finder

A web application that helps you discover nearby cafes on an interactive map. Search by location, view detailed information, and explore cafes in your area.

## About

Cafe Finder combines Google Maps with Places API to provide real-time information about cafes near you. The application features an intuitive map interface where users can:
- Search cafes within a customizable radius (up to 20 results)
- View detailed cafe information including ratings, hours, and contact details
- Browse cafes by current location or if you want some privacy - search by address
- Click markers to see photos and additional details

Built with React frontend and Node.js/Express backend, the app uses the latest Google Places API (new) with Advanced Marker elements for modern map visualization.

## Tech Stack

**Frontend:** React, Vite, @react-google-maps/api, Tailwind CSS  
**Backend:** Node.js, Express, Axios  
**APIs:** Google Places API (new), Google Maps JavaScript API, Geocoding API

## Quick Start

### Prerequisites
- Node.js (v14+)
- Google Cloud account with Places API (new), Maps JavaScript API, and Geocoding API enabled
- Google Maps ID (Vector type with marker library support)

### Setup

1. **Install dependencies**
```bash
# Backend
cd server && npm install

# Frontend
cd cafe-finder && npm install
```

2. **Configure environment**
To access API key, go to https://console.cloud.google.com/ and create an account with added billing information (don`t worry, API is free), then enable API key

Create `.env` in server folder:
```env
GOOGLE_API_KEY=your_api_key
PORT=5000
```

Create `.env` in root folder:
```env
VITE_GOOGLE_API_KEY=your_api_key
```

3. **Create Google Map ID**
- Go to [Google Cloud Console](https://console.cloud.google.com/) → Maps → Map IDs
- Create new Map ID with type: JavaScript, Vector, enable Tilt & Rotation
- Add Map ID to your Map component

4. **Run the application**
```bash
# Terminal 1 - Backend
cd server && node index.js

# Terminal 2 - Frontend  
cd cafe-finder && npm run dev
```

## Key Features

- **Detailed View**: InfoWindow displays ratings, hours, phone, address, and photos
- **Geocoding**: Search by city or use current GPS location
- **Responsive design**: Integration with both desktop and mobile devices

## 📜 License

Copyright © 2026 kloqaep. All rights reserved.

This project is private and intended for personal use and portfolio demonstration only. No part of this project (code, text, or assets) may be copied, redistributed, or used in other projects without permission.