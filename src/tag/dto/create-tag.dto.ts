export class CreateTagDto {
    // readonly user_id:string;
    readonly programme_id: string; // 项目 ID
    readonly tagName: string; // 标签名称
    readonly deadline: string; // 截止日期
  }