import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../types/api-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse()['message'] ? exception.getResponse()['message'] : exception.message || 'Unknown error';
    const error:any = exception.getResponse()|| exception.getResponse()['error'];
    delete error['message'];

    const apiResponse: ApiResponse = {
      success: false,
      data: null,
      error: error,
      message: errorMessage,
    };

    response.status(status).json(apiResponse);
  }
}