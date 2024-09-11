'use client'

import authApiRequest from '@/apiRequests/auth'
import { Button } from '@/app/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function ButtonRegister() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      router.push('/login')
      } catch (error) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}