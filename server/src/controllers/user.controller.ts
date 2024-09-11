import prisma from '@/configs/prisma';
import { CreateUserType, UpdateUserType } from "@/schemaValidations/user.schema";

export const createUser = async (data: CreateUserType) => {
  return prisma.user.create({
    data
  });
}

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string) => {
    return prisma.user.findUniqueOrThrow({
      where: { id },
    });
};

export const updateUser = async (id: string, data: UpdateUserType) => {
  return prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};