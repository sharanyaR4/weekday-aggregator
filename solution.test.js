// test/solution.test.js
import { solution } from "../src/solution.js";

test("Full week present", () => {
  const input = {
    "2020-01-01": 4,  // Wed
    "2020-01-02": 4,  // Thu
    "2020-01-03": 6,  // Fri
    "2020-01-04": 8,  // Sat
    "2020-01-05": 2,  // Sun
    "2020-01-06": -6, // Mon
    "2020-01-07": 2,  // Tue
    "2020-01-08": -2  // Wed
  };
  const expected = {
    "Mon": -6,
    "Tue": 2,
    "Wed": 2,   // 4 + (-2) = 2
    "Thu": 4,
    "Fri": 6,
    "Sat": 8,
    "Sun": 2
  };
  expect(solution(input)).toEqual(expected);
});

test("Missing days (Thu, Fri)", () => {
  const input = {
    "2020-01-01": 6,  // Wed
    "2020-01-04": 12, // Sat
    "2020-01-05": 14, // Sun
    "2020-01-06": 2,  // Mon
    "2020-01-07": 4   // Tue
  };
  const expected = {
    "Mon": 2,
    "Tue": 4,
    "Wed": 6,
    "Thu": 9,  // avg(Wed=6, Sat=12) = 9
    "Fri": 10, // avg(Thu=9, Sat=12) = 10
    "Sat": 12,
    "Sun": 14
  };
  expect(solution(input)).toEqual(expected);
});
