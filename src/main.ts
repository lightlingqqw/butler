import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import  { ResponseInterceptor }  from './common/interceptors/response.interceptor';
import { join } from 'path';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.useGlobalInterceptors(new ResponseInterceptor()); // 全局注册拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册异常过滤器
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
