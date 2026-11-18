# fetch() Won't Tell You When Your API Fails (Check res.ok) #Shorts

**Video:** [fetch() Won't Tell You When Your API Fails (Check res.ok) #Shorts](https://youtu.be/lpFkCa1CGWQ)  
**Goes live:** Fri Nov 6, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Weather App with JavaScript](../../projects/02-weather-app/)

## The bug

`fetch()` does not throw when the server answers with 400 or 404. If you go straight to `res.json()`, you can treat an error body as weather data, or fail in a confusing way later.

See [`bug.js`](bug.js).

## The fix

`getJSON()` catches a network failure and also checks `res.ok`. When the status is not OK, it throws a clear error that the UI can show. The rest of the app uses this helper with `await` inside `try` / `catch`.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
