import type { Knex } from "knex";
import * as dotenv from 'dotenv'

// Update with your config settings.

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2', // Replace with your database client
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootroot',
      database: process.env.DB_NAME || 'invoice_app'
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
      extension: 'ts'
    }
  },

  production: {
    client: 'mysql2', // Replace with your database client
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './dist/db/migrations',
      extension: 'js'
    },
    seeds: {
      directory: './dist/db/seeds',
      extension: 'js'
    }
  }
};

module.exports = config;