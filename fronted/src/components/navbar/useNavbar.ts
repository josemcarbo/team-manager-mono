import { type MouseEventHandler, useState } from 'react'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/core/redux/hooks'
import { type User } from '@/app/core/redux/services/userApi'

interface UseNavbar {
  user: User | null
  userSettingOpen: boolean
  handleUserSettingOpen: MouseEventHandler<HTMLLIElement>
  handleLogOut: MouseEventHandler<HTMLLIElement>
}

export default function useNavbar (): UseNavbar {
  const [userSettingOpen, setUserSettingOpen] = useState(true)
  const user = useAppSelector((state) => state.user.user)
  const { removeValue } = useSessionStorage()
  const router = useRouter()

  const handleUserSettingOpen: MouseEventHandler<HTMLLIElement> = (event) => {
    setUserSettingOpen(!userSettingOpen)
  }

  const handleLogOut: MouseEventHandler<HTMLLIElement> = () => {
    removeValue('token')
    router.push('/login')
  }

  return { user, userSettingOpen, handleUserSettingOpen, handleLogOut }
}
