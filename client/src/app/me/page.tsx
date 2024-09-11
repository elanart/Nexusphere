import userApiRequest from '@/apiRequests/user'
import Profile from '@/app/me/profile'
import envConfig from '@/config'
import { cookies } from 'next/headers'


export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const result = await userApiRequest.me(sessionToken?.value ?? '')
  return (
    <div>
      <h1>Profile</h1>
      <div>Hello {result.payload.data.fullName}</div>
      {/* <Profile /> */}
    </div>
  )
}