import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../types/api-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * This is the catch method of the HttpExceptionFilter.
   * It will be called whenever an HttpException is thrown.
   * It will format the error response into our standard ApiResponse format.
   * @param exception The HttpException that has been thrown.
   * @param host The ArgumentsHost object that provides the request context.
   */
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