import { type MouseEventHandler, useState } from 'react'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { type User } from '@/app/core/redux/services/userApi'
import { resetUserState } from '@/app/core/redux/features/userSlice'
import { resetBoardState } from '@/app/core/redux/features/boardSlice'
import { resetCardState } from '@/app/core/redux/features/cardSlice'

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
  const dispatch = useAppDispatch()

  const handleUserSettingOpen: MouseEventHandler<HTMLLIElement> = (event) => {
    setUserSettingOpen(!userSettingOpen)
  }

  const handleLogOut: MouseEventHandler<HTMLLIElement> = () => {
    dispatch(resetUserState())
    dispatch(resetBoardState())
    dispatch(resetCardState())
    removeValue('token')
    router.push('/login')
  }

  return { user, userSettingOpen, handleUserSettingOpen, handleLogOut }
}
