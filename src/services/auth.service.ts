import User from '../models/User'
import { AUTH_MESSAGE, IAuthResponse, IUserData } from '../types/auth.interface'
import { HTTP_STATUS_CODE } from '../types/shared.interface'

const createUser = async (userData: IUserData): Promise<IAuthResponse> => {
  const newUser = new User(userData)
  await newUser.validate()
  await newUser.save()
  return {
    message: AUTH_MESSAGE.USER_CREATED,
    user: newUser,
    status: HTTP_STATUS_CODE.CREATED
  }
}

export const authService = {
  createUser
}
