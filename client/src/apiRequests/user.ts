import http from '@/lib/http'
import { UserResponseType } from '@/schemaValidations/user.schema'

const userApiRequest = {
  me: (sessionToken: string) =>
    http.get<UserResponseType>('user/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }),
  meClient: () => http.get<UserResponseType>('user/me')
}

export default userApiRequest