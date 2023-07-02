import { UserEntry } from '../types/types';

export let usersRecords: UserEntry[] = [];

export function deleteEntry(uid: string){
  usersRecords = usersRecords.filter((item) => item.id !== uid);
  return usersRecords;
}