import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
      envFilePath: '.env', // 指定 .env 文件路径
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库主机
      port: 3306, // 数据库端口
      username: 'root', // 数据库用户名
      password: '12345678', // 数据库密码
      database: 'db', // 数据库名称
      autoLoadEntities:true,
      synchronize: true, // 自动同步数据库结构（仅用于开发环境）
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    DownloadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
