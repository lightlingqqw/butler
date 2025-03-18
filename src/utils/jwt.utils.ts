// src/utils/jwt.utils.ts
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function getUserIdFromToken(req: Request): string {

  
  // 从请求头中获取 Authorization
  const authHeader = req.headers.authorization;

  console.log('authHeader:',authHeader);
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  // 提取 Token（格式：Bearer <token>）
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token is missing');
  }

  // 解析 Token
  const decoded = jwt.verify(token, 'iehsifh11') as { userId: string }; 

  console.log('authHeader:',authHeader);
  console.log('token:',token);
  console.log('decoded:',decoded);
  return decoded.userId; // 返回 userId/*  */
}