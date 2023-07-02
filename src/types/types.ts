export interface UserEntry extends NewUser {
  id: string,
}

export interface NewUser {
  username: string,
  age: number,
  hobbies: string[]
}

export interface Updates {
  username?: string,
  age?: number,
  hobbies?: string[]
}