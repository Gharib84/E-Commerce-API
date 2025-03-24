import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../types/api-response';
@Injectable()
export class ApiResposeInterceptorService implements NestInterceptor {

    intercept(
        context: ExecutionContext,
        handler: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return handler.handle().pipe(
            map((data): ApiResponse => {
                const message =
                    data && data.message ? data.message : 'Request successful';
                if (data?.message) delete data.message;
                const data_ =
                    data instanceof Error ? null : data?.data ? data.data : data;
                const success = !(data instanceof Error) && data_ !== null;

                return {
                    success,
                    data: data_,
                    error: data instanceof Error ? data : null,
                    message,
                };
            }),
        );
    }

}
