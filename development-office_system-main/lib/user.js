import crypto from 'crypto'
import User from '../models/user'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  // const user = await DB.createUser({ username, salt, hash })
  const result = await User.create({ username: username, salt: salt, hash: hash });

  // return { username: user.username, createdAt: user.createdAt }
  return result
}

export async function findUser({ username, password }) {
  // Here you should lookup for the user in your DB and compare the password:

  // const user = await DB.findUser(...)
  const user = await User.findOne({ where: { username: username } })
  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === hash

  const result = passwordsMatch ? user : null

  // return { username, createdAt: Date.now() }
  return result
}
