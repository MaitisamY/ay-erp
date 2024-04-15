import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const db = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

db.connect()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to database:', err));