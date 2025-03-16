import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('wechat-login')
  async wechatLogin(@Body('code') code: string) {
    return this.authService.wechatLogin(code);
  }
}
