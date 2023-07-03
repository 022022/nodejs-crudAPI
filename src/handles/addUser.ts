import { usersRecords } from '../data/model';
import { messages } from '../data/messages';
import { NewUser } from '../types/types';
import { v4 } from 'uuid';
import { STATUS } from '../constants/constants';
import { isValid } from '../utils/utils';

export function addUser(body: string) {
  let res: string;
  let status: number;

  let newUserData: NewUser;
  try {
    newUserData = JSON.parse(body);
  } catch {
    status  = STATUS.SERVER_ERROR;
    res = messages.jsonInvalid;
    return {status, res}
  }


  if(isValid(newUserData)){
    const uid = v4();
    const addingUser = {id: uid, ...newUserData}
    usersRecords.push(addingUser);
    const user = usersRecords.find((item) => item.id === uid);

    if(user){
      status  = STATUS.CREATED;
      res = JSON.stringify(user);
    } else {
      status  = STATUS.SERVER_ERROR;
      res = messages.genericError;
    }

  } else {
    status  = STATUS.BAD_REQUEST;
    res = messages.invalidUserType;
  }
  return {status, res}
}
