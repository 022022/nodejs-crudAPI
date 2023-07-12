import { deleteEntry, usersRecords } from './../data/model';
import { messages } from './../data/messages';
import { validate } from 'uuid';
import { STATUS } from '../constants/constants';

export function deleteUser(uid: string){
  let res = '';
  let status: number;

  if(!validate(uid)){
    status = STATUS.BAD_REQUEST;
    res = messages.invalidUid;
    return {status, res};
  }

  const user = usersRecords.find((item) => item.id === uid);
  if(user){
    const newUsersRecords = deleteEntry(uid);
    const user = newUsersRecords.find((item) => item.id === uid);
    if(user === undefined){
      status = STATUS.NO_CONTENT;
    } else {
      status = STATUS.SERVER_ERROR;
      res = messages.genericError;
    }
  } else {
    status = STATUS.NOT_FOUND;
    res = messages.userNotExist;
  }

  return {status, res}
}