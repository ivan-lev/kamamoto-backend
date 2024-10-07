import 'dotenv/config'
import path from 'path'

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/kamamotodb',
  NODE_ENV = 'dev',
  JWT_SECRET = 'secret-key',
  BASE_URL = 'http://localhost'
} = process.env

const PUBLIC_PATH = path.join(__dirname, 'public')

export { BASE_URL, PORT, DB_URL, NODE_ENV, JWT_SECRET, PUBLIC_PATH }
