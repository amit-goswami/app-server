import Guide from '../models/Guide'
import { AUTH_MESSAGE, IAuthResponse, IUserData } from '../types/auth.interface'
import { HTTP_STATUS_CODE } from '../types/shared.interface'

const createGuide = async (userData: IUserData): Promise<IAuthResponse> => {
  const newGuide = new Guide(userData)
  await newGuide.validate()
  await newGuide.save()
  return {
    message: AUTH_MESSAGE.USER_CREATED,
    user: newGuide,
    status: HTTP_STATUS_CODE.CREATED
  }
}

export const guideService = {
  createGuide
}
