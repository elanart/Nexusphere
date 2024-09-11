import z from 'zod';
import { UserRoleEnum } from '@prisma/client';

export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: z.nativeEnum(UserRoleEnum),
  createdDate: z.date(),
  isActive: z.boolean()
})

export const UserResponse = z.object({
  data: UserSchema,
  message: z.string()
})

export type UserResponseType = z.TypeOf<typeof UserResponse>

export const UserListResponse = z.object({
  data: z.array(UserResponse),
  message: z.string()
})

export type UserListResponseType = z.TypeOf<typeof UserListResponse>

export const CreateUser = z.object({
  username: z.string().trim().min(3).max(256),
  password: z.string().min(8).max(256),
  fullName: z.string().trim().min(2).max(256),
  email: z.string().email(),
  role: z.nativeEnum(UserRoleEnum),
});

export type CreateUserType = z.TypeOf<typeof CreateUser>;

export const UpdateUser = z.object({
  username: z.string().trim().min(3).max(256).optional(),
  password: z.string().min(8).max(128).optional(),
  fullName: z.string().trim().min(2).max(256).optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserRoleEnum).optional(),
  isActive: z.boolean().optional(),
  services: z.string().trim().min(2).max(256).optional(),
  bio: z.string().trim().min(2).max(256).optional(),
  experience: z.number().optional(),
  availability: z.string().trim().min(2).max(256).optional()
});

export type UpdateUserType = z.TypeOf<typeof UpdateUser>;
