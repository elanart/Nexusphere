import { useState, useCallback } from 'react';
import taskApiRequest from '@/apiRequests/task';
import { TaskBodyType } from '@/schemaValidations/project.schema';

export const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<TaskBodyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskApiRequest.getAll(projectId);
      setTasks(response.payload);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  return { tasks, fetchTasks, loading, error };
};
