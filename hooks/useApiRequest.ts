'use client'

import {useState} from 'react'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: HeadersInit
  body?: unknown
}

const parseErrorResponse = async (res: Response): Promise<string> => {
  try {
    const errorData = await res.json()
    if (errorData?.error && typeof errorData.error === 'string') {
      return errorData.error
    }
  } catch {
    // ignore}
  }
  return `Server error ${res.status}`
}

export const useApiRequest = <T = unknown>() => {
  const [response, setResponse] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async (url: string, options: RequestOptions = {}): Promise<T> => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      if (!res.ok) {
        const parsedError = await parseErrorResponse(res)
        throw new Error(parsedError)
      }

      const data: T = await res.json()
      setResponse(data)
      return data
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('API request error:', err)
        setError(err.message || 'API request failed')
      } else {
        console.error('Unknown API error:', err)
        setError('Unknown error')
      }
      setResponse(null)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    request,
    response,
    loading,
    error,
  }
}
