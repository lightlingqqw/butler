import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Role } from 'src/roles/enums/role.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
    ){}

    async wechatLogin(code: string) {
        const appid = this.configService.get<string>('WECHAT_APPID');
        const secret = this.configService.get<string>('WECHAT_APPSECRET');

        console.log('appid和secret',appid,secret);
    
        // 调用微信接口获取 openid 和 session_key
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
        const response = await axios.get(url);
    
        const { openid, session_key } = response.data;
    
        if (!openid) {
          throw new Error('微信登录失败');
        }else{
            console.log('登陆成功,openid:',openid);
        }

        
    
        // 保存用户信息（这里可以根据 openid 查询或创建用户）
        const user = await this.saveUser(openid);
    
        // 返回自定义登录态（如 JWT token）
        const token = this.generateToken(user);
        return { data:token };
      }
    
    
      private generateToken(user: any) {
        const payload = { userId: user.id };
        return this.jwtService.sign(payload);
      }

      private async saveUser(openid: string) {
        let user = await this.userRepository.findOne({ where: { id:openid } });
        if (!user) {
          user = this.userRepository.create({ 
            id:openid,
            nickname:'测试'+new Date().getTime(),
            role:Role.User,
            avatar:'',
            updatedAt:new Date(),
            createdAt:new Date()
        });
          await this.userRepository.save(user);

        //   return {}
        }
        return user;
      }
}
