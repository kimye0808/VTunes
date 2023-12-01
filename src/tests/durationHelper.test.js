import { secondsToMinutes } from '../component/common//durationHelper'; // Replace 'yourFileName' with the actual file name where the function is defined

test('secondsToMinutes function converts seconds to minutes correctly', () => {
  // Test cases
  const testCases = [
    { seconds: 0, expected: '0:00' },
    { seconds: 30, expected: '0:30' },
    { seconds: 60, expected: '1:00' },
    { seconds: 90, expected: '1:30' },
    { seconds: 120, expected: '2:00' },
    { seconds: 150, expected: '2:30' },
    { seconds: 3600, expected: '60:00' },
    { seconds: 3665, expected: '61:05' },
    // Add more test cases as needed
  ];

  // Run tests
  testCases.forEach(({ seconds, expected }) => {
    const result = secondsToMinutes(seconds);
    expect(result).toBe(expected);
  });
});
