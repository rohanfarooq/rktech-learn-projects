# Switch °C to °F Without Calling the API Again (JavaScript Tip) #Shorts

**Video:** [Switch °C to °F Without Calling the API Again (JavaScript Tip) #Shorts](https://youtu.be/KMe4c9LKNpg)  
**Goes live:** Sat Nov 7, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Weather App with JavaScript](../../projects/02-weather-app/)

## The bug

If the toggle fetches the weather again, you wait on the network just to change a label, and you can hit rate limits or show a loading flash for no reason. The API already returned Celsius.

See [`bug.js`](bug.js).

## The fix

The app stores the last payload in `lastData`. `formatTemp()` converts from that stored Celsius value. The button only flips `unit` and calls `render()` — no second request.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
