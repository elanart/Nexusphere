import { useState, useCallback } from 'react'
import projectApiRequest from '@/apiRequests/project'
import { ProjectBody, ProjectBodyType } from '@/schemaValidations/project.schema'

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectBodyType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const response = await projectApiRequest.getAll()
      setProjects(response.payload)
    } catch (err) {
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  return { projects, fetchProjects, loading, error }
}
