# Dwi Movie Search

A simple React app to search movies using the OMDb API, add favorites, and view them on a separate page.

## Features

- Search movies from OMDb API
- Add/remove favorites
- View favorites on a dedicated page (`/favorites`)
- Responsive UI with navigation
- Client-side routing using React Router

## Demo

[Live on Vercel](https://dwi-react-movie-search.vercel.app/)

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/movie-search.git
cd movie-search
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up OMDb API key

Create a `.env` file in the project root:

```
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

### 4. Run the development server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Run tests

```sh
npm test
```

## Deployment

This app is deployed on Vercel.  
For custom deployments, ensure you add a `vercel.json` file for proper routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]