import Driver from '../models/Driver'
import Guide from '../models/Guide'
import User from '../models/User'
import { IUserDataDocument } from '../types/auth.interface'
import { USER_ROLES } from '../types/shared.interface'

const findUserByEmail = (email: string): Promise<IUserDataDocument[]> => {
  return User.find({ email })
}

const findGuideByEmail = (email: string): Promise<IUserDataDocument[]> => {
  return Guide.find({ email })
}

const findDriverByEmail = (email: string): Promise<IUserDataDocument[]> => {
  return Driver.find({ email })
}

const findUserByUID = (uid: string): Promise<IUserDataDocument[]> => {
  return User.find({ uid })
}

const findGuideByUID = (uid: string): Promise<IUserDataDocument[]> => {
  return Guide.find({ uid })
}

const findDriverByUID = (uid: string): Promise<IUserDataDocument[]> => {
  return Driver.find({ uid })
}

const searchInDifferentCollectionsAccordingToRole = async ({
  role,
  uid
}: {
  role: USER_ROLES
  uid: string
}): Promise<IUserDataDocument[]> => {
  switch (role) {
    case USER_ROLES.USER:
      return findUserByUID(uid)
    case USER_ROLES.GUIDE:
      return findGuideByUID(uid)
    case USER_ROLES.DRIVER:
      return findDriverByUID(uid)
  }
}

const searchInDifferentCollectionsAccordingToRoleAndMobile = async ({
  role,
  mobile
}: {
  role: USER_ROLES
  mobile: string
}): Promise<IUserDataDocument[]> => {
  switch (role) {
    case USER_ROLES.USER:
      return findUserByEmail(mobile)
    case USER_ROLES.GUIDE:
      return findGuideByEmail(mobile)
    case USER_ROLES.DRIVER:
      return findDriverByEmail(mobile)
  }
}

export const sharedService = {
  findUserByEmail,
  findGuideByEmail,
  findDriverByEmail,
  findUserByUID,
  findGuideByUID,
  findDriverByUID,
  searchInDifferentCollectionsAccordingToRole,
  searchInDifferentCollectionsAccordingToRoleAndMobile
}
