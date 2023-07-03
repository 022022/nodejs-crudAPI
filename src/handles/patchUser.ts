import { validate } from 'uuid';
import { usersRecords } from './../data/model';
import { messages } from './../data/messages';
import { NewUser } from './../types/types';
import { STATUS } from '../constants/constants';

export function patchUser(uid: string, body: string) {
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

    if(newData.username) {
      if(typeof newData.username === 'string'){
        user.username = newData.username;
      } else {   return returnInvalidType();    }
    }

    if(newData.age) {
      if(typeof newData.age === 'number'){
        user.age = newData.age;
      } else {   return returnInvalidType();    }
    }

    if(newData.hobbies) {
      if(Array.isArray(newData.hobbies) && newData.hobbies.every((item) => typeof item === 'string')){
        user.hobbies = newData.hobbies;
      } else {   return returnInvalidType();    }
    }

    status = STATUS.OK;
    res = JSON.stringify(user);

  } else {
    status = STATUS.NOT_FOUND;
    res = messages.userNotExist;
  }

  return {status, res}

}


function returnInvalidType(){
  const status  = STATUS.BAD_REQUEST;
  const res = messages.invalidUserType;
  return {status, res}
}