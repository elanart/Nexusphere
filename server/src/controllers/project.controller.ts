import prisma from '@/configs/prisma';
import { ProjectBodyType, ProjectDetailBodyType, TaskBodyType } from '@/schemaValidations/project.schema';

export const createProject = async (data: ProjectBodyType) => {
  const project = await prisma.project.create({ data });
  return project;
};

export const getProjectById = async (id: string) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error('Project not found');
  return project;
};

export const updateProject = async (id: string, data: ProjectBodyType) => {
  const project = await prisma.project.update({
    where: { id },
    data,
  });
  return project;
};

export const deleteProject = async (id: string) => {
  const project = await prisma.project.delete({ where: { id } });
  return project;
};

// ProjectDetail
export const createProjectDetail = async (data: ProjectDetailBodyType) => {
  const projectDetail = await prisma.projectDetail.create({ data });
  return projectDetail;
};

// Task
export const createTask = async (data: TaskBodyType) => {
  const task = await prisma.task.create({ data });
  return task;
};

export const updateTask = async (id: string, data: TaskBodyType) => {
  const task = await prisma.task.update({ where: { id }, data });
  return task;
};
