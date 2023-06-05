'use client'

export default function useSessionStorage (): any {
  const setValue = (key: string, value: string | number | boolean): void => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const getValue = (key: string): string | null => {
    const value = window.localStorage.getItem(key)
    return value !== undefined ? JSON.parse(value as string) : null
  }

  const removeValue = (key: string): void => {
    window.localStorage.removeItem(key)
  }

  return { setValue, getValue, removeValue }
}
