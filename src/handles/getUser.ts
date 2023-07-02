import { usersRecords } from './../data/model';
import { messages } from './../data/messages';
import { validate } from 'uuid';
import { STATUS } from '../constants/constants';

export function getUser(uid: string){
  let res: string;
  let status: number;

  if(!validate(uid)){
    status = STATUS.BAD_REQUEST;
    res = messages.invalidUid;
    return {status, res}
  }

  const user = usersRecords.find((item) => item.id === uid);
  if(user){
    status = STATUS.OK;
    res = JSON.stringify(user);
  } else {
    status = STATUS.NOT_FOUND;
    res = messages.userNotExist;
  }

  return {status, res}
}