import { FastifyRequest } from 'fastify'
import prisma from '@/configs/prisma';
import envConfig from '@/configs/configs';
import { AuthError } from '@/utils/errors';
import { User } from '@prisma/client';

interface CustomRequest extends FastifyRequest {
  user?: User;
}

export const requireLoginedHook = async (request: CustomRequest) => {
  const sessionToken = envConfig.COOKIE_MODE
    ? request.cookies.sessionToken
    : request.headers.authorization?.split(' ')[1]

  if (!sessionToken) throw new AuthError('Session token not received')
  const session_row = await prisma.session.findUnique({
    where: {
      token: sessionToken as string
    },
    include: {
      user: true
    }
  })
  if (!session_row) throw new AuthError('Session Token does not exist')
  request.user = session_row.user
}