import { useState, useCallback } from 'react';
import taskApiRequest from '@/apiRequests/task';
import { TaskBodyType } from '@/schemaValidations/project.schema';

export const useCreateTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createTask = useCallback(async (task: TaskBodyType) => {
    setLoading(true);
    try {
      await taskApiRequest.create(task);
      setSuccess(true);
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTask, loading, error, success };
};
