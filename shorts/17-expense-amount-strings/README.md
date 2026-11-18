# Expense Total Says 0510, Not 15? Input Values Are Strings (JavaScript) #Shorts

**Video:** [Expense Total Says 0510, Not 15? Input Values Are Strings (JavaScript) #Shorts](https://youtu.be/qZgmwaG0Jak)  
**Goes live:** Fri Nov 20, 2026, 5:00 PM PKT  
**Status:** Scheduled  
**From the full project:** [Build an Expense Tracker in React](../../projects/03-expense-tracker/)

## The bug

`e.target.value` is a string. Adding strings concatenates them, so expenses of 5 and 10 become `"0510"` instead of 15 (the leading 0 is the reduce's starting value).

See [`bug.js`](bug.js).

## The fix

`handleSubmit` runs `const value = Number(amount)` once, stores `amount: value`, and rejects empty, zero, negative, or non-numeric amounts with `if (!(value > 0))`. The summary can then add the numbers for a real total.

See [`fix.jsx`](fix.jsx). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
