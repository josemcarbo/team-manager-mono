'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import useSessionStorage from '@/app/core/hooks/useSessionStorage'
import React, { useEffect, useState } from 'react'
import { useGetUserQuery } from '@/app/core/redux/services/userApi'
import { useAppDispatch } from '@/app/core/redux/hooks'
import { addUser } from '@/app/core/redux/features/userSlice'
import styles from './page.module.css'
import Loading from './components/loading/loading'
import Navbar from './components/navbar/navbar'
import Modal from './components/modal/modal'
import ProjectComponent from './components/project/project'

export default function Home (): React.ReactElement {
  console.log('Home')
  const [userQueryEnabled, setUserQueryEnabled] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getValue } = useSessionStorage()
  const token = getValue('token')
  const {
    data: user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
    isLoading: userIsLoading
  } = useGetUserQuery(undefined, { skip: !userQueryEnabled })

  useEffect(() => {
    token === null ? router.push('/login') : setUserQueryEnabled(true)
  }, [token])

  useEffect(() => {
    if (userIsSuccess && user !== null) {
      dispatch(addUser(user))
    }

    if (userIsError && userError !== null) {
      const { status, data } = userError as any
      toast.error(
        `${status as string}: ${
          (data?.message ?? 'ERR_CONNECTION_REFUSED') as string
        }`
      )
    }
  }, [userIsSuccess, user, userIsError, userError])

  return (
    <>
      {(userIsLoading || !userIsSuccess) && <Loading />}
      {userIsSuccess && user !== null && (
        <main className={styles.container}>
          <Navbar />
          <section className={styles.section}></section>
          <Modal hidden={false}>
            <ProjectComponent/>
          </Modal>
        </main>
      )}
    </>
  )
}
