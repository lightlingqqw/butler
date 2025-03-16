// src/common/interfaces/error-response.interface.ts
export interface ErrorResponseFormat {
    result: string; // 结果状态（如 'error'）
    message: string; // 错误消息
    data: null; // 数据为空
    row?: any; // 额外的行数据（可选）
  }