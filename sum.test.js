import {
  validateForm
} from './helpers.js'

describe('validateForm', () => {
  test('should return true for valid inputs', () => {
      const result = validateForm('test@e.com', 'password123');
      expect(result).toBe(true);
  });

  test('should return false for empty email', () => {
      const result = validateForm('', 'password123');
      expect(result).toBe(false);
  });

  test('should return false for short password', () => {
      const result = validateForm('test@e.com', '1234');
      expect(result).toBe(false);
  });
});
