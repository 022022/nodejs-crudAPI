import { STATUS } from '../constants/constants';
import { usersRecords } from './../data/model';

export function getAllUsers(){
  const status = STATUS.OK;
  const res = JSON.stringify(usersRecords);

  return {status, res}
}