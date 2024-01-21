import express from "express";
import "dotenv/config";

export const environmentVariables = {
  mongo_base_url: process.env.MONGO_BASE_URL,
  mongo_user: process.env.MONGO_USER,
  mongo_password: process.env.MONGO_PASSWORD,
  mongo_hostname: process.env.MONGO_HOSTNAME,
  mongo_cluster: process.env.MONGO_CLUSTER,
  port: process.env.PORT,
  host: process.env.HOST,
  jwt_sectret: process.env.JWT_SECRET,
};
