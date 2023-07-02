import { usersRecords } from './data/model';

export function getAllUsers(){
  const status = 200;
  const res = JSON.stringify(usersRecords);

  return {status, res}
}