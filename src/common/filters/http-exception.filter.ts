// src/common/filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ErrorResponseFormat } from '../interfaces/error-response.interface';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.message || 'Internal Server Error';
  
      response.status(status).json({
        result: 400,
        message,
        data: null,
      });
    }
  }