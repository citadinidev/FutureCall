
# FutureCall

**FutureCall** is a flexible library for scheduling functions periodically in JavaScript, with options to control intervals, time windows, and specific days of the week. It works with a configurable timezone and allows you to set precise timing for when your functions should be executed.

---

## Installation

You can install **futurecall** from npm:

```bash
npm install futurecall
```

---

## Usage

### Importing the Library

```javascript
const FutureCall = require('futurecall');
```

### Creating an Instance

```javascript
const futureCall = new FutureCall();
```

### Scheduling Functions

To schedule a function to run periodically, use the `newcall` method.

```javascript
futureCall.newcall(func, {
  interval: 'HH:mm:ss',  // The interval between executions (e.g., '02:00:00' for every 2 hours)
  startTime: 'HH:mm:ss', // The start time (e.g., '07:00:00')
  endTime: 'HH:mm:ss',   // The end time (e.g., '22:00:00')
  days: [1, 0, 1, 0, 1, 0, 0], // Days of the week to run the function (1 for active, 0 for inactive). Example: [1, 0, 1, 0, 1, 0, 0] = Monday, Wednesday, and Friday
});
```

### Example

```javascript
const futureCall = new FutureCall();

// Function to be executed
function post() {
  console.log('Post function executed');
}

// Schedule the 'post' function every 2 hours, between 7 AM and 10 PM, on Monday, Wednesday, and Friday
futureCall.newcall(post, {
  interval: '02:00:00', // Run every 2 hours
  startTime: '07:00:00', // Start at 7 AM
  endTime: '22:00:00',   // End at 10 PM
  days: [1, 0, 1, 0, 1, 0, 0] // Only run on Monday, Wednesday, and Friday
});
```

### Canceling a Scheduled Function

You can cancel a previously scheduled function with the `cancel` method.

```javascript
futureCall.cancel(post);
```

---

## Parameters

- **interval**: The time interval between executions (in `HH:mm:ss` format, e.g., `'02:00:00'` for every 2 hours).
- **startTime**: The start time (in `HH:mm:ss` format, e.g., `'07:00:00'`).
- **endTime**: The end time (in `HH:mm:ss` format, e.g., `'22:00:00'`).
- **days**: An array of 7 elements representing each day of the week. Use `1` for active and `0` for inactive. Example: `[1, 0, 1, 0, 1, 0, 0]` (Monday, Wednesday, Friday).
- **timezone**: Optional. The timezone to use for scheduling. Defaults to `America/New_York`.

---

## Example Use Case

### Example 1: Send Email Every 1 Hour Between 8 AM and 8 PM, Every Day

```javascript
futureCall.newcall(function sendEmail() {
  console.log('Send Email function executed');
}, {
  interval: '01:00:00', // Every hour
  startTime: '08:00:00', // Start at 8 AM
  endTime: '20:00:00',   // End at 8 PM
  days: [1, 1, 1, 1, 1, 1, 1] // Every day of the week
});
```

### Example 2: Post Every 2 Hours Between 7 AM and 10 PM on Mondays, Wednesdays, and Fridays

```javascript
futureCall.newcall(function post() {
  console.log('Post function executed');
}, {
  interval: '02:00:00', // Every 2 hours
  startTime: '07:00:00', // Start at 7 AM
  endTime: '22:00:00',   // End at 10 PM
  days: [1, 0, 1, 0, 1, 0, 0] // Monday, Wednesday, and Friday
});
```

---

## License

This project is licensed under the MIT License.

---

## Support

If you encounter any issues or have suggestions, feel free to open an issue on the [GitHub repository](https://github.com/citadinidev/FutureCall).

---
