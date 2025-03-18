// src/common/interceptors/response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseFormat } from '../interfaces/response.interceptor';

  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
      return next.handle().pipe(
        map((data) => {
          // 如果是数组或对象，直接返回
          if (Array.isArray(data)) {
            return {
              result: 1,
              message: '',
              data: data, // 直接返回原始数据
              row: null,
            };
          }
  
          // 默认格式化逻辑
          return {
            result: 1,
            message: data?.message || '',
            data: data?.data || null,
            row: data?.row || null,
          };
        }),
      );
    }
  }