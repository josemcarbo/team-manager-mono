/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import {
  useCreateProjectMutation,
  useFindAllProjectQuery
} from '@/app/core/redux/services/projectApi'
import { refreshList } from '@/app/core/redux/features/projectSlice'
import styles from './styles.module.css'
import { useAppDispatch } from '@/app/core/redux/hooks'
import OverlayComponent from '@/components/overlay/overlay'

export default function ProjectComponent (): React.ReactElement {
  const [projectQueryEnabled, setProjectQueryEnabled] = useState(false)
  const [createProject, { isSuccess, data, error, isError }] =
    useCreateProjectMutation()
  const {
    data: projects,
    isSuccess: projectsIsSuccess,
    isError: projectsIsError,
    error: projectsError
  } = useFindAllProjectQuery({}, { skip: !projectQueryEnabled })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading }
  } = useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      setProjectQueryEnabled(true)
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, isError, error])

  useEffect(() => {
    if (projectsIsSuccess && projects !== null) {
      dispatch(refreshList(projects))
    }

    if (projectsIsError && projectsError !== null) {
      const { status, data } = projectsError as any
      toast.error(
        `${status as string}: ${
          (data?.message ?? 'ERR_CONNECTION_REFUSED') as string
        }`
      )
    }
  }, [projectsIsSuccess, projects, projectsIsError, projectsError])

  const onSubmit = async (): Promise<void> => {
    const body: any = watch()
    await createProject(body)
  }

  return (
    <OverlayComponent>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_container}>
            <label className={styles.placeholder}>Name</label>
            <input
              className={styles.input}
              disabled={isLoading}
              {...register('name', {
                required: 'Name is required'
              })}
            />
            <label className={styles.error}>
              {errors.name?.message as string}
            </label>
          </div>

          <div className={styles.input_container}>
            <label className={styles.placeholder}>Description</label>
            <textarea
              className={styles.input}
              disabled={isLoading}
              {...register('description')}
            />
            <label className={styles.error}>
              {errors.password?.message as string}
            </label>
          </div>
          <div className={styles.group_button}>
            <button
              className={styles.button}
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </OverlayComponent>
  )
}
