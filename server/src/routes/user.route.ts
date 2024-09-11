import prisma from '@/configs/prisma';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '@/controllers/user.controller';
import { requireLoginedHook } from '@/hooks/auth.hooks';
import { UserResponse, UpdateUserType, UserResponseType, CreateUserType } from '@/schemaValidations/user.schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))
  fastify.get<{ Reply: UserResponseType }>(
    '/me', 
    {
      schema: {
        response: {
          200: UserResponse
        }
      }
    },
    async (request, reply) => {
      reply.send({
        data: request.user!,
        message: 'Get information successfully'
      })
    }
  )
   fastify.get('/', { preHandler: requireLoginedHook }, async (request, reply) => {
    try {
      const users = await getAllUsers();
      return reply.status(200).send({ data: users, message: 'Users retrieved successfully' });
    } catch (error) {
      reply.status(500).send({ message: 'Failed to retrieve users' });
    }
  });

   fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preHandler: requireLoginedHook },
    async (request, reply) => {
      try {
        const user = await getUserById(request.params.id);
        const parsedUser = UserResponse.parse({ data: user, message: 'User retrieved successfully' });
        return reply.status(200).send(parsedUser);
      } catch (error) {
        reply.status(404).send({ message: 'User not found' });
      }
    }
  );

  fastify.post<{ Body: CreateUserType }>(
    '/',
    async (request, reply) => {
      try {
        const data = request.body;
        const newUser = await createUser(data);
        const parsedResponse = UserResponse.parse({ data: newUser, message: 'User created successfully' });
        return reply.status(201).send(parsedResponse);
      } catch (error) {
        reply.status(400).send({ message: 'Failed to create user' });
      }
    }
  );

  fastify.patch<{ Params: { id: string }; Body: UpdateUserType }>(
    '/:id',
    { preHandler: requireLoginedHook },
    async (request, reply) => {
      const { id } = request.params;
      const { user } = request;

      if (!user) {
        return reply.status(401).send({ message: 'User not authenticated' });
      }

      try {
        if (id !== user.id) {
          return reply.status(403).send({ message: 'Not authorized to update this user' });
        }

        const updatedUser = await updateUser(id, request.body);
        
        if (user.role === 'CLIENT') {
          const clientUpdateData = request.body as { services?: string };
          if (clientUpdateData.services) {
            await prisma.client.update({
              where: { userId: id },
              data: { services: clientUpdateData.services },
            });
          }
        } else if (user.role === 'FREELANCER') {
          const freelancerUpdateData = request.body as {
            bio?: string;
            experience?: number;
            availability?: string;
          };
          await prisma.freelancer.update({
            where: { userId: id },
            data: {
              bio: freelancerUpdateData.bio,
              experience: freelancerUpdateData.experience,
              availability: freelancerUpdateData.availability,
            },
          });
        }
        
        reply.status(200).send({ data: updatedUser, message: 'User updated successfully' });
      } catch (error) {
        reply.status(400).send({ message: 'Failed to update user', error });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preHandler: requireLoginedHook },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const deletedUser = await deleteUser(id);
        const parsedResponse = UserResponse.parse({ data: deletedUser, message: 'User deactivated successfully' });
        return reply.status(200).send(parsedResponse);
      } catch (error) {
        reply.status(400).send({ message: 'Failed to deactivate user' });
      }
    }
  );
}