import { UserRoleEnum } from '@prisma/client'
import z from 'zod'

export const RegisterBody = z
  .object({
    username: z.string().trim().min(3).max(256),
    password: z.string().min(8).max(256),
    fullName: z.string().trim().min(2).max(256),
    email: z.string().email(),
    role: z.nativeEnum(UserRoleEnum),
  }).strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    user: z.object({
      username: z.string().trim().min(3).max(256),
      password: z.string().min(8).max(256),
      fullName: z.string().trim().min(2).max(256),
      email: z.string().email(),
      role: z.nativeEnum(UserRoleEnum),
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    username: z.string().trim().min(3).max(256),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const RefreshSessionBody = z.object({}).strict()

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>
export const RefreshSessionRes = RegisterRes

export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>