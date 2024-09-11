import { useState, useEffect } from 'react'
import userApiRequest from '@/apiRequests/user'
import { UserResponseType } from '@/schemaValidations/user.schema'
import { clientSessionToken } from '@/lib/http'

const useUser = () => {
  const [user, setUser] = useState<UserResponseType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionToken = clientSessionToken.value
        if (!sessionToken) {
          throw new Error('No session token found')
        }
        const response = await userApiRequest.me(sessionToken)
        setUser(response.payload)
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}

export default useUser
