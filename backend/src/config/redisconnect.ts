import { createClient } from "redis";

const client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

export default client;