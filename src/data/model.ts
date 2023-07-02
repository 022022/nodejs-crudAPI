import { UserEntry } from '../types/types';

export let usersRecords: UserEntry[] = [{
  id: '1',
  username: 'vasya',
  age: 18,
  hobbies: []
}];

export function deleteEntry(uid: string){
  usersRecords = usersRecords.filter((item) => item.id !== uid);
  return usersRecords;
}