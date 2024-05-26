import bcrypt from 'bcrypt'

const saltRounds = 10
const password = '12345678'

const hashedPassword = bcrypt.hashSync(password, saltRounds)

console.log(hashedPassword)