import { describe, it, expect } from 'vitest';
import { formatDisplayName } from './formatDisplayName';
import { Dependent } from '@/types/Dependent';

describe('formatDisplayName', () => {
  it('formats name with relationship', () => {
    const dependent: Dependent = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      birthYear: 2010,
      phoneNumber: '555-0123',
      relationship: 'child'
    };

    const result = formatDisplayName(dependent);
    expect(result).toBe('John Doe - Child');
  });

  it('formats name without relationship', () => {
    const dependent: Dependent = {
      id: '1',
      firstName: 'Jane',
      lastName: 'Smith',
      birthYear: 2008,
      phoneNumber: '555-0124',
      relationship: undefined
    };

    const result = formatDisplayName(dependent);
    expect(result).toBe('Jane Smith');
  });
});