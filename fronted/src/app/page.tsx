'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import useSessionStorage from '@/app/core/hooks/useSessionStorage'
import React, { useEffect, useState } from 'react'
import { useGetUserQuery } from '@/app/core/redux/services/userApi'
import { useFindAllProjectQuery } from '@/app/core/redux/services/projectApi'
import { useAppDispatch } from '@/app/core/redux/hooks'
import { addUser } from '@/app/core/redux/features/userSlice'
import { refreshList } from '@/app/core/redux/features/projectSlice'
import styles from './page.module.css'
import Loading from '../components/loading/loading'
import Navbar from '../components/navbar/navbar'
import CreateLabel from '@/components/project/label/create/create'

export default function HomePage (): React.ReactElement {
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

  const {
    data: projects,
    isSuccess: projectIsSuccess,
    isError: projectIsError,
    error: projectError,
    isLoading: projectIsLoading
  } = useFindAllProjectQuery(undefined, { skip: !userQueryEnabled })

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

  useEffect(() => {
    if (projectIsSuccess && projects !== null) {
      dispatch(refreshList(projects))
    }

    if (projectIsError && projectError !== null) {
      const { status, data } = projectError as any
      toast.error(
        `${status as string}: ${
          (data?.message ?? 'ERR_CONNECTION_REFUSED') as string
        }`
      )
    }
  }, [projects, projectIsSuccess, projectIsError, projectError])

  return (
    <>
      {(userIsLoading || projectIsLoading) && <Loading />}
      {userIsSuccess && user !== null && (
        <main className={styles.container}>
          <Navbar />
          <section className={styles.section}>
            <CreateLabel />
          </section>
        </main>
      )}
    </>
  )
}
