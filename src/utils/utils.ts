import { NewUser } from '../types/types';

export function isValid(item: Partial<NewUser>): item is NewUser {
  if(typeof item.username === 'string'
    && typeof item.age === 'number'
    && Array.isArray(item.hobbies)
    && item.hobbies.every((item) => typeof item === 'string')
  ) {
        return true;
  }
  return false;
}