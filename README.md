
# FutureCall

FutureCall is a library to schedule and execute periodic tasks based on time intervals, start/end times, specific days of the week, and timezones. It allows you to schedule functions to be executed periodically based on a customizable configuration.

## Installation

You can install FutureCall from npm using:

```bash
npm install futurecall
```

## Usage Example

First, require the `futurecall` library and create a new instance:

```javascript
const FutureCall = require('futurecall');

// Create an instance of FutureCall
const futureCall = new FutureCall();

// Function to be executed
function post() {
  console.log('Post function executed');
}

// Schedule the 'post' function every 2 hours, between 7 AM and 10 PM, on Monday, Wednesday, and Friday, with timezone 'America/New_York'
const taskId = futureCall.newcall(post, {
  interval: '02:00:00', // Run every 2 hours
  startTime: '07:00:00', // Start at 7 AM
  endTime: '22:00:00',   // End at 10 PM
  days: [1, 0, 1, 0, 1, 0, 0], // Monday, Wednesday, and Friday (1 = run, 0 = skip)
  timezone: 'America/New_York' // Timezone
});
```

## Parameters

- `interval` (string): Interval between executions, in `HH:mm:ss` format (e.g., `'02:00:00'` for every 2 hours).
- `startTime` (string): Start time in `HH:mm:ss` format (e.g., `'07:00:00'`).
- `endTime` (string): End time in `HH:mm:ss` format (e.g., `'22:00:00'`).
- `days` (array): Array of 7 numbers representing days of the week (1 = active, 0 = inactive). For example, `[1, 0, 1, 0, 1, 0, 0]` means the task will run on Monday, Wednesday, and Friday.
- `timezone` (string, optional): The timezone to use (e.g., `'America/New_York'`). Defaults to `'America/New_York'`.

## Methods

- `newcall(func, options)`: Schedules a function to run periodically based on the given options.
- `cancel(func)`: Cancels a scheduled task.

## License

This project is licensed under the MIT License.
