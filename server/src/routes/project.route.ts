import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createProject, getProjectById, updateProject, deleteProject, createProjectDetail, createTask, updateTask } from '@/controllers/project.controller';
import { ProjectBody, ProjectDetailBody, TaskBody } from '@/schemaValidations/project.schema';
import { requireLoginedHook } from '@/hooks/auth.hooks';

interface Params {
  id: string;
}

export default async function projectRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))
  fastify.post('/', async (request, reply) => {
    const data = ProjectBody.parse(request.body);
    const project = await createProject(data);
    reply.status(201).send({ data: project, message: 'Project created successfully' });
  });

  fastify.get<{ Params: Params }>('/:id', async (request, reply) => {
    const project = await getProjectById(request.params.id);
    reply.status(200).send({ data: project, message: 'Project retrieved successfully' });
  });

  fastify.patch<{ Params: Params }>('/:id', async (request, reply) => {
    const data = ProjectBody.parse(request.body);
    const project = await updateProject(request.params.id, data);
    reply.status(200).send({ data: project, message: 'Project updated successfully' });
  });

  fastify.delete<{ Params: Params }>('/:id', async (request, reply) => {
    const project = await deleteProject(request.params.id);
    reply.status(204).send({ data: project, message: 'Project deleted successfully' });
  });

  fastify.post('/project-details', async (request, reply) => {
    const data = ProjectDetailBody.parse(request.body);
    const projectDetail = await createProjectDetail(data);
    reply.status(201).send({ data: projectDetail, message: 'Project detail created successfully' });
  });

  fastify.post('/tasks', async (request, reply) => {
    const data = TaskBody.parse(request.body);
    const task = await createTask(data);
    reply.status(201).send({ data: task, message: 'Task created successfully' });
  });

  fastify.patch<{ Params: Params }>('/tasks/:id', async (request, reply) => {
    const data = TaskBody.parse(request.body);
    const task = await updateTask(request.params.id, data);
    reply.status(200).send({ data: task, message: 'Task updated successfully' });
  });
}
