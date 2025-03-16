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
        map((data) => ({
          result: 1, // 默认结果为成功
          message: data?.message || '', // 从数据中提取消息
          data: data?.data || null, // 从数据中提取主要数据
          row: data?.row || null, // 从数据中提取额外行数据
        })),
      );
    }
  }