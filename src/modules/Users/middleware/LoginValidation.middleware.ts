import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { loginSchema } from '../schemas/login.schema';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      loginSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);

        throw new NotFoundException(error.errors[0].message);
      }
    }

    next();
  }
}
