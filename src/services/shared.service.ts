import User from '../models/User'
import { IUserDataDocument } from '../types/auth.interface'

const findUserByEmail = (email: string): Promise<IUserDataDocument[]> => {
  return User.find({ email })
}

const findUserByUID = (uid: string): Promise<IUserDataDocument[]> => {
  return User.find({ uid })
}

export const sharedService = {
  findUserByEmail,
  findUserByUID
}
