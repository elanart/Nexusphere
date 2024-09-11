import envConfig from '@/configs/configs'
import { PrismaErrorCode } from '@/constants/error-reference'
import prisma from '@/configs/prisma'
import { LoginBodyType, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, isPrismaClientKnownRequestError } from '@/utils/errors'
import { signSessionToken } from '@/utils/jwt'
import { addMilliseconds } from 'date-fns'
import ms from 'ms'

export const registerController = async (body: RegisterBodyType) => {
  try {
    const hashedPassword = await hashPassword(body.password)
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        fullName: body.fullName,
        role: body.role
      }
    })

    const sessionToken = signSessionToken({
      userId: user.id
    })
    const expiresAt = addMilliseconds(new Date(), ms(envConfig.SESSION_TOKEN_EXPIRES_IN))
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
        expiresAt
      }
    })
    return {
      user,
      session
    }
  } catch (error: any) {
    if (isPrismaClientKnownRequestError(error)) {
      if (error.code === PrismaErrorCode.UniqueConstraintViolation) {
        throw new EntityError([{ field: 'username', message: 'Username already exists' }])
      }
    }
    throw error
  }
}
export const logoutController = async (sessionToken: string) => {
  await prisma.session.delete({
    where: {
      token: sessionToken
    }
  })
  return 'Logout successful'
}
export const slideSessionController = async (sessionToken: string) => {
  const expiresAt = addMilliseconds(new Date(), ms(envConfig.SESSION_TOKEN_EXPIRES_IN))
  const session = await prisma.session.update({
    where: {
      token: sessionToken
    },
    data: {
      expiresAt
    }
  })
  return session
}
export const loginController = async (body: LoginBodyType) => {
  const user = await prisma.user.findUnique({
    where: {
      username: body.username
    }
  })
  if (!user) {
    throw new EntityError([{ field: 'username', message: 'User not found' }])
  }
  const isPasswordMatch = await comparePassword(body.password, user.password)
  if (!isPasswordMatch) {
    throw new EntityError([{ field: 'password', message: 'Incorrect username or password' }])
  }
  const sessionToken = signSessionToken({
    userId: user.id
  })
  const expiresAt = addMilliseconds(new Date(), ms(envConfig.SESSION_TOKEN_EXPIRES_IN))

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      token: sessionToken,
      expiresAt
    }
  })
  return {
    user,
    session
  }
}