// src/solution.js

/**
 * Given a dictionary D { 'YYYY-MM-DD': number },
 * returns an object { 'Mon': sum, ... 'Sun': sum }
 * Missing days are filled as average of prev and next day values.
 */
export function solution(D) {
  const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = {};
  daysOrder.forEach(day => result[day] = null);

  // Step 1: Fill sums for days present in D
  for (const [dateStr, value] of Object.entries(D)) {
    const dayName = getDayName(dateStr);
    if (result[dayName] === null) {
      result[dayName] = value;
    } else {
      result[dayName] += value;
    }
  }

  // Step 2: Fill missing days by averaging prev & next
  for (let i = 0; i < daysOrder.length; i++) {
    if (result[daysOrder[i]] === null) {
      const prevIndex = findPrevFilledIndex(result, i, daysOrder);
      const nextIndex = findNextFilledIndex(result, i, daysOrder);
      const prevValue = result[daysOrder[prevIndex]];
      const nextValue = result[daysOrder[nextIndex]];
      result[daysOrder[i]] = Math.floor((prevValue + nextValue) / 2);
    }
  }

  return result;
}

function getDayName(dateStr) {
  const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateObj = new Date(dateStr);
  const jsDay = dateObj.getUTCDay(); // 0=Sun, 6=Sat
  return daysMap[jsDay];
}

function findPrevFilledIndex(result, startIndex, daysOrder) {
  let i = startIndex;
  do {
    i = (i - 1 + daysOrder.length) % daysOrder.length;
  } while (result[daysOrder[i]] === null);
  return i;
}

function findNextFilledIndex(result, startIndex, daysOrder) {
  let i = startIndex;
  do {
    i = (i + 1) % daysOrder.length;
  } while (result[daysOrder[i]] === null);
  return i;
}
