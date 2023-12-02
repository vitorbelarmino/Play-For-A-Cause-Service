import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../schemas/user.schema';
import { ZodError } from 'zod';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      userSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);

        throw new NotFoundException(error.errors[0].message);
      }
    }

    next();
  }
}
