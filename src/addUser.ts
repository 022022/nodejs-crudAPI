import { usersRecords } from './data/data';
import { messages } from './data/messages';
import { NewUser } from './types/types';
import { v4 } from 'uuid';

export function addUser(body: string) {
  let res: string;
  let status: number;

  let newUserData: NewUser;
  try {
    newUserData = JSON.parse(body);
  } catch {
    status  = 500;
    res = messages.jsonInvalid;
    return {status, res}
  }


  if(isValid(newUserData)){
    const uid = v4();
    const addingUser = {
      id: uid,
      username: newUserData.username,
      age: newUserData.age,
      hobbies: newUserData.hobbies
    }

    usersRecords.push(addingUser);
    const user = usersRecords.find((item) => item.id === uid);

    if(user){
      status  = 201;
      res = `A user was successfully created: ${JSON.stringify(user)}`;
    } else {
      status  = 500;
      res = messages.genericError;
    }

  } else {
    status  = 400;
    res = messages.invalidUserType;
  }
  return {status, res}
}

function isValid(item: any): item is NewUser {
  return 'username' in item && 'age' in item && 'hobbies' in item;
}
