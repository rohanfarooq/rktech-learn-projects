# Turn a List Into Pie Chart Data (Group By Category in JavaScript) #Shorts

**Video:** [Turn a List Into Pie Chart Data (Group By Category in JavaScript) #Shorts](https://youtu.be/QGtH6PaCVgU)  
**Goes live:** Mon Nov 9, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build an Expense Tracker in React](../../projects/03-expense-tracker/)

## The bug

A pie chart needs one slice per category, not one slice per transaction. If you hand Recharts the raw list, duplicate categories stay separate and income can sneak into a spending chart.

See [`bug.js`](bug.js).

## The fix

Loop the expenses into a `totals` object keyed by category, then `Object.entries(totals).map(...)` to build `{ name, value, fill }` objects for `<Pie data={data} />`.

See [`fix.jsx`](fix.jsx). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
