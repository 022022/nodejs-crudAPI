import { usersRecords } from './data/data';
import { messages } from './data/messages';
import { Updates } from './types/types';

export function updateUser(uid: string, body: string) {
  let res: string;
  let status: number;

  const user = usersRecords.find((item) => item.id === uid);

  if(user){
    let newData: Updates;
    try {
      newData = JSON.parse(body);
    } catch {
      status  = 500;
      res = messages.jsonInvalid;
      return {status, res}
    }

    user.username = newData.username || user.username;
    user.age = newData.age || user.age;
    user.hobbies = newData.hobbies || user.hobbies;

    status = 200;
    res = JSON.stringify(user);
    
  } else {
    status = 404;
    res = messages.userNotExist;
  }

  return {status, res}

}
