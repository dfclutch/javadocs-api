import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import handler from "../libs/handler";
import dynamoDb from '../libs/dynamo';

export const register = handler(async (event) => {
  const { username, password } = JSON.parse(event.body);

  /*try {
    const { Item } = await dynamoDb.query({
      TableName: process.env.usersTable,
      Key: { username }
    });

    if (Item) {
      return { error: 'Username already taken.' };
    }
  } catch (err){
    // this is the good case
    console.log(err);
  }*/

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = {
    TableName: process.env.usersTable,
    Item: {
      username: username,
      password: hash,
      createdAt: Date.now(),
      id: uuid(),
    },
  };

  const result = await dynamoDb.put(newUser);
  console.log('>', result);
  return result;
});

export const list = handler(async (event) => {
  console.log(event);
  const params = {
    TableName: process.env.usersTable
  };

  const result = await dynamoDb.scan(params);
  return result.Items;
});