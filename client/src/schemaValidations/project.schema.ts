import { z } from 'zod';
import { PriorityEnum, ProjectStatus, TaskStatus } from '@prisma/client';

export const ProjectBody = z.object({
  id: z.string().min(3).max(256).optional(),
  name: z.string().min(3).max(256),
  status: z.nativeEnum(ProjectStatus).optional(),
  priority: z.nativeEnum(PriorityEnum),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date(),
  clientId: z.string().uuid(),
});

export type ProjectBodyType = z.TypeOf<typeof ProjectBody>;

export const ProjectDetailBody = z.object({
  projectId: z.string().uuid(),
  description: z.string().optional(),
  deadline: z.date(),
  deliverables: z.string(),
});

export type ProjectDetailBodyType = z.TypeOf<typeof ProjectDetailBody>;

export const TaskBody = z.object({
  name: z.string().min(3).max(256),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(PriorityEnum),
  dueDate: z.date().optional(),
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type TaskBodyType = z.TypeOf<typeof TaskBody>;

export const ProjectResponse = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    status: z.nativeEnum(ProjectStatus),
    priority: z.nativeEnum(PriorityEnum),
    startDate: z.date(),
    endDate: z.date(),
    clientId: z.string(),
  }),
  message: z.string(),
});

export type ProjectResponseType = z.TypeOf<typeof ProjectResponse>;
