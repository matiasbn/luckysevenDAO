import appRootPath from 'app-root-path'
import dotenv from 'dotenv'
import Joi from '@hapi/joi'

dotenv.config({
  path: `${appRootPath.path}/../.env`,
})

const environmentVarsSchema = Joi.object({
  PRIVATE_KEY: Joi.string().required(),
  LOCAL_PROVIDER: Joi.string().required(),
})
  .unknown()
  .required()

const { error } = environmentVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
