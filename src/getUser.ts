import { usersRecords } from './data/data';
import { messages } from './data/messages';

export function getUser(uid: string){
  let res: string;
  let status: number;
  const user = usersRecords.find((item) => item.id === uid);
  if(user){
    status = 200;
    res = JSON.stringify(user);
  } else {
    status = 404;
    res = messages.userNotExist;
  }

  return {status, res}
}