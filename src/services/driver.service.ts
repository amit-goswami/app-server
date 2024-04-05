import Driver from '../models/Driver'
import { AUTH_MESSAGE, IAuthResponse, IUserData } from '../types/auth.interface'
import { HTTP_STATUS_CODE } from '../types/shared.interface'

const createDriver = async (userData: IUserData): Promise<IAuthResponse> => {
  const newDriver = new Driver(userData)
  await newDriver.validate()
  await newDriver.save()
  return {
    message: AUTH_MESSAGE.USER_CREATED,
    user: newDriver,
    status: HTTP_STATUS_CODE.CREATED
  }
}

export const driverService = {
  createDriver
}
