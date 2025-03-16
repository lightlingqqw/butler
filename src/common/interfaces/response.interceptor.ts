// src/common/interfaces/response.interface.ts
export interface ResponseFormat<T=any,K=any> {
    result: number; // 结果状态 默认1代表成功
    message?: string; // 返回的消息
    data: T; // 返回的数据
    row?: K; // 额外的行数据（可选）
  }