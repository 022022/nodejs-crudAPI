import { STATUS } from '../constants/constants';
import { usersRecords } from './../data/model';

export function getAllUsers(){
  // to check Internal server error uncomment a line below
  // throw new Error('gfg');
  const status = STATUS.OK;
  const res = JSON.stringify(usersRecords);

  return {status, res}
}