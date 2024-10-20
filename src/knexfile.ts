import "dotenv/config";

export default {
  client: "mysql2", // Replace with your database client
  connection: {
    host: process.env.DB_LOCAL_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_LOCAL_PORT || "3306", 10),
    user: process.env.DB_LOCAL_USER || "root",
    password: process.env.DB_LOCAL_PASSWORD || "rootroot",
    database: process.env.DB_NAME || "invoice_app",
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./seeds",
    extension: "ts",
  },
};
