import http from '@/lib/http';
import { TaskBodyType } from '@/schemaValidations/project.schema';

const taskApiRequest = {
  getAll: async (projectId: string) => {
    const response = await http.get<TaskBodyType[]>(`/projects/${projectId}/tasks`);
    return response;
  },
  create: async (task: TaskBodyType) => {
    const response = await http.post('/tasks', task);
    return response;
  },
};

export default taskApiRequest;
