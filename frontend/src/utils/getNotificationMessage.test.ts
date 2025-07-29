import { describe, it, expect } from 'vitest';
import { getNotificationMessage } from './getNotificationMessage';

describe('getNotificationMessage', () => {
  it('returns message for both additions and deletions', () => {
    const result = getNotificationMessage(2, 3);
    expect(result).toBe('Successfully added 2 and removed 3 project assignments');
  });

  it('returns message for single addition and single deletion', () => {
    const result = getNotificationMessage(1, 1);
    expect(result).toBe('Successfully added 1 and removed 1 project assignments');
  });

  it('returns undefined when both counts are zero', () => {
    const result = getNotificationMessage(0, 0);
    expect(result).toBeUndefined();
  });

  it('returns undefined when both counts are negative', () => {
    const result = getNotificationMessage(-1, -2);
    expect(result).toBeUndefined();
  });

  it('handles zero added count with positive deleted count', () => {
    const result = getNotificationMessage(0, 5);
    expect(result).toBe('Successfully removed 5 project assignments');
  });

  it('handles positive added count with zero deleted count', () => {
    const result = getNotificationMessage(7, 0);
    expect(result).toBe('Successfully added 7 project assignments');
  });
});