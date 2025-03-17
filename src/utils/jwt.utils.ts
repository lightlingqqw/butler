// src/utils/jwt.utils.ts
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function getUserIdFromToken(req: Request): string {
  // 从请求头中获取 Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  // 提取 Token（格式：Bearer <token>）
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token is missing');
  }

  // 解析 Token
  const decoded = jwt.verify(token, 'your-secret-key') as { sub: string }; // 替换为你的密钥
  return decoded.sub; // 返回 userId
}