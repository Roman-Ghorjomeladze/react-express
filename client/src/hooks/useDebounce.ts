import { useEffect, useState } from 'react'

export function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      if(debouncedValue === value) {
        return
      } else {
        setDebouncedValue(value)
      }
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return debouncedValue
}