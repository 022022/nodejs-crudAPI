import { deleteEntry, usersRecords } from './data/model';
import { messages } from './data/messages';
import { validate } from 'uuid';

export function deleteUser(uid: string){
  let res: string;
  let status: number;

  if(!validate(uid)){
    status = 400;
    res = messages.invalidUid;
    return {status, res};
  }

  const user = usersRecords.find((item) => item.id === uid);
  if(user){
    const newUsersRecords = deleteEntry(uid);
    const user = newUsersRecords.find((item) => item.id === uid);
    if(user === undefined){
      status = 204;
    } else {
      status = 500;
      res = messages.genericError;
    }
  } else {
    status = 404;
    res = messages.userNotExist;
  }

  return {status, res}
}