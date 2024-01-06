/**
 * 错误信息提示框实体
 */
export interface ErrorResponse {
    ok: boolean;
    name: string;
    url: string;
    status: number;
    // 后台封装的返回信息
    error: {
      errors: string[];
      message: string;
      status: number;
    }
}
