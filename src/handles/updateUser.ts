import { validate } from 'uuid';
import { usersRecords } from './../data/model';
import { messages } from './../data/messages';
import { NewUser } from './../types/types';
import { STATUS } from '../constants/constants';

export function updateUser(uid: string, body: string) {
  let res: string;
  let status: number;

  if(!validate(uid)){
    status = STATUS.BAD_REQUEST;
    res = messages.invalidUid;
    return {status, res}
  }

  const user = usersRecords.find((item) => item.id === uid);

  if(user){
    let newData: Partial<NewUser>;
    try {
      newData = JSON.parse(body);
    } catch {
      status  = STATUS.SERVER_ERROR;
      res = messages.jsonInvalid;
      return {status, res}
    }

    user.username = newData.username || user.username;
    user.age = newData.age || user.age;
    user.hobbies = newData.hobbies || user.hobbies;

    status = STATUS.OK;
    res = JSON.stringify(user);

  } else {
    status = STATUS.NOT_FOUND;
    res = messages.userNotExist;
  }

  return {status, res}

}
