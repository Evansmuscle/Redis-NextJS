import {
  Client,
  Entity,
  EntityCreationData,
  Repository,
  Schema,
} from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

export interface Car {
  make: string;
  model: string;
  image: string;
  description: string;
}

export class Car extends Entity {}
let schema = new Schema(
  Car,
  {
    make: { type: "string" },
    model: { type: "string" },
    image: { type: "string" },
    description: { type: "string", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createCar(data: Car): Promise<string> {
  await connect();

  const repository = new Repository(schema, client);

  const car = repository.createEntity();
  car.make = data.make;
  car.model = data.model;
  car.image = data.image;
  car.description = data.description;

  const id = await repository.save(car);
  return id;
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}

export async function searchCars(query: string) {
  await connect();

  const repository = new Repository(schema, client);

  const cars = await repository
    .search()
    .where("make")
    .eq(query)
    .or("model")
    .eq(query)
    .or("description")
    .matches(query)
    .return.all();

  return cars;
}
