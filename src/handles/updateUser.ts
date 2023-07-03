import { validate } from 'uuid';
import { usersRecords } from './../data/model';
import { messages } from './../data/messages';
import { NewUser } from './../types/types';
import { STATUS } from '../constants/constants';
import { isValid } from '../utils/utils';

export function updateUser(uid: string, body: string) {
  let res: string;
  let status: number;

  if(!validate(uid)){
    status = STATUS.BAD_REQUEST;
    res = messages.invalidUid;
    return {status, res}
  }

  let newData: NewUser;

  try {
    newData = JSON.parse(body);
  } catch {
    status  = STATUS.SERVER_ERROR;
    res = messages.jsonInvalid;
    return {status, res}
  }

  if(isValid(newData)){
    const user = usersRecords.find((item) => item.id === uid);
    if(user){
      user.username = newData.username;
      user.age = newData.age;
      user.hobbies = newData.hobbies;

      status = STATUS.OK;
      res = JSON.stringify(user);

    } else {
      status = STATUS.NOT_FOUND;
      res = messages.userNotExist;
    }
  } else {
    status  = STATUS.BAD_REQUEST;
    res = messages.invalidUserType;
  }

  return {status, res}

}
