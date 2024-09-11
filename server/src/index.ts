import envConfig, { API_URL } from '@/configs/configs'
import { errorHandlerPlugin } from '@/plugins/errorHandler.plugins'
import validatorCompilerPlugin from '@/plugins/validatorCompiler.plugins'
import fastifyAuth from '@fastify/auth'
import fastifyCookie from '@fastify/cookie'
import fastifyHelmet from '@fastify/helmet'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import path from 'path'
import { createFolder } from '@/utils/helpers'
import userRoutes from './routes/user.route'
import './types/fastify';
import projectRoutes from './routes/project.route'
import authRoutes from './routes/auth.route'

const fastify = Fastify({
  logger: true
})

const start = async () => {
    try {
        createFolder(path.resolve(envConfig.UPLOAD_FOLDER))
        const whitelist = ['*']
        fastify.register(cors, {
            origin: whitelist,
            credentials: true
        })

        fastify.register(fastifyAuth, {
            defaultRelation: 'and'
        })

        fastify.register(fastifyHelmet, {
            crossOriginResourcePolicy: {
            policy: 'cross-origin'
        }
    })
    fastify.register(fastifyCookie)
    fastify.register(validatorCompilerPlugin)
    fastify.register(errorHandlerPlugin)
    fastify.register(authRoutes, {
      prefix: '/auth'
    })
    fastify.register(userRoutes, {
      prefix: '/user'
    })
    fastify.register(projectRoutes, {
      prefix: '/projects'
    })

    await fastify.listen({
      port: envConfig.PORT
    })
    console.log(`Server running: ${API_URL}`)
    } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()