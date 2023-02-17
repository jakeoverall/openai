import { BadRequest } from '@bcwdev/auth0provider/lib/Errors.js'
import { openai } from '../services/OpenAIService.js'
import BaseController from '../utils/BaseController'


export class AIController extends BaseController {
  constructor() {
    super('api/ai')
    this.router
      .get('/image', this.getImage)
  }

  async getImage(req, res, next) {
    try {
      if (!req.query.prompt) {
        throw new BadRequest('You must provide a prompt to generate an image')
      }
      if (req.query.prompt.length < 5 || req.query.prompt.length > 1000) {
        throw new BadRequest('You must provide a prompt to generate an image')
      }

      if (req.query.n) {
        req.query.n = req.query.n <= 10 ? req.query.n : 1
      }

      const response = await openai.createImage({
        prompt: req.query.prompt,
        n: Number(req.query.n) || 1,
        size: "256x256"
      });

      res.send(response.data.data)
    } catch (error) {
      next(error)
    }
  }
}
