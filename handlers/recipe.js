import * as uuid from "uuid";
import handler from "../libs/handler";
import dynamoDb from '../libs/dynamo';

export const create = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.recipeTable,
    Item: {
      userId: "123",
      recipeId: uuid.v1(),
      recipe: data.recipe,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});

export const get = handler(async (event) => {
  const params = {
    TableName: process.env.recipeTable,
    Key: {
      userId: '123',
      recipeId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});

export const list = handler(async (event) => {
  console.log(event);
  const params = {
    TableName: process.env.recipeTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params);
  return result.Items;
});

export const update = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.recipeTable,
    Key: {
      userId: "123",
      recipeId: event.pathParameters.id,
    },
    UpdateExpression: "SET recipe = :recipe",
    ExpressionAttributeValues: {
      ":recipe": data.recipe || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});

export const deleteRecipe = handler(async (event) => {
  const params = {
    TableName: process.env.recipeTable,
    Key: {
      userId: "123",
      recipeId: event.pathParameters.id
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});