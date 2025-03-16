// src/common/interfaces/error-response.interface.ts
export interface ErrorResponseFormat {
    result: number; 
    message: string; // 错误消息
    data: null; // 数据为空
    row?: any; // 额外的行数据（可选）
  }