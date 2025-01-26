/**
 * Converts a time in "HH:mm:ss" format to total seconds of the day.
 * @param {string} time - The time in "HH:mm:ss" format.
 * @returns {number} - Total seconds of the time.
 */
function parseTimeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  /**
   * Converts the interval from "HH:mm:ss" format to total seconds.
   * @param {string} interval - The interval in "HH:mm:ss" format.
   * @returns {number} - The interval in seconds.
   */
  function convertIntervalToSeconds(interval) {
    return parseTimeToSeconds(interval);
  }
  
  /**
   * Adjusts the current date to the given timezone.
   * @param {Date} date - The current date object.
   * @param {string} timezone - The timezone (e.g., "America/New_York").
   * @returns {Date} - Date object adjusted to the timezone.
   */
  function adjustTimezone(date, timezone) {
    try {
      return new Date(
        date.toLocaleString('en-US', { timeZone: timezone })
      );
    } catch (error) {
      throw new Error('Invalid timezone.');
    }
  }
  
  /**
   * FutureCall class allows scheduling and canceling periodic tasks.
   */
  class FutureCall {
    constructor() {
      this.tasks = [];
    }
  
    /**
     * Schedules a function to run periodically.
     * @param {Function} func - The function to be executed.
     * @param {Object} options - The task configuration.
     * @param {string} options.interval - The time interval between executions in "HH:mm:ss" format.
     * @param {string} options.startTime - The start time in "HH:mm:ss" format.
     * @param {string} options.endTime - The end time in "HH:mm:ss" format.
     * @param {Array<number>} options.days - An array of 7 numbers representing days of the week (1 for days to run, 0 for days to skip).
     * @param {string} [options.timezone="America/New_York"] - The timezone (default is New York timezone).
     */
    newcall(func, { interval, startTime, endTime, days, timezone = "America/New_York" }) {
      if (typeof func !== 'function') {
        throw new Error('The "func" argument must be a function.');
      }
  
      // Validate days array: it must be exactly 7 values of 0 or 1
      if (days.length !== 7 || !days.every(day => day === 0 || day === 1)) {
        throw new Error('The "days" array must contain exactly 7 values of 0 or 1.');
      }
  
      const task = {
        func,
        interval: convertIntervalToSeconds(interval),
        startTime: parseTimeToSeconds(startTime),
        endTime: parseTimeToSeconds(endTime),
        days,
        timezone,
        timer: null,
      };
  
      this.startTask(task);
      this.tasks.push(task);
    }
  
    startTask(task) {
      const checkAndRun = () => {
        const now = adjustTimezone(new Date(), task.timezone);
        const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const currentDay = now.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
  
        // Check if the current time is within the specified start and end time
        if (
          currentTime >= task.startTime &&
          currentTime <= task.endTime &&
          task.days[currentDay] === 1 // Check if today is a valid day to run the task (1 means run)
        ) {
          task.func();
        }
      };
  
      // Start the task at the specified interval
      task.timer = setInterval(checkAndRun, task.interval * 1000);
    }
  
    /**
     * Cancels a scheduled task.
     * @param {Function} func - The function that was scheduled.
     */
    cancel(func) {
      const index = this.tasks.findIndex((task) => task.func === func);
  
      if (index !== -1) {
        clearInterval(this.tasks[index].timer);
        this.tasks.splice(index, 1);
      }
    }
  }
  
  module.exports = FutureCall;
  