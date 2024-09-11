import http from '@/lib/http'
import { ProjectBodyType } from '@/schemaValidations/project.schema'

const projectApiRequest = {
  getAll: () => http.get<ProjectBodyType[]>('/projects'),
}

export default projectApiRequest