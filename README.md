# 101497015_comp3123_labtest2 – Weather App

This is a React based weather application for COMP 3123 Lab Test 2. It displays current weather information for any city using the OpenWeatherMap API.

![Default Screen; Pre-search](https://github.com/hcustod/101497015_comp3123_labtest2/blob/main/labss.jpeg?raw=true)



## Tech Stack

- React (Create React App)
- Fetch API
- OpenWeatherMap Current Weather API

## Setup

1. Clone repository:
```bash
   git clone https://github.com/<your-username>/101497015_comp3123_labtest2.git
   cd 101497015_comp3123_labtest2
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the project root and provide API key:
```
   REACT_APP_OPENWEATHER_KEY=your_api_key_here
```

4. Start the app:
```bash
   npm start
```

## Usage

- The app loads weather for Toronto as the default city. 
- Use the search bar to look up any city by name (case-insensitive).
- Toggle between °C and °F using the button on the main card. 

## API Used

OpenWeatherMap – Current Weather Data

Endpoint example:
```
https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=YOUR_API_KEY
```

## Notes

- City name search is case-insensitive but must be a valid city recognized by OpenWeatherMap.
- If the API key is missing or invalid, an error message is shown in the UI.