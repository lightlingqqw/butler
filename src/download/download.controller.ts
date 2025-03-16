import { DownloadService } from './download.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('image/:filename')
  downloadImage(@Param('filename') filename: string, @Res() res: Response) {
    console.log('调用了下载文件的接口',filename);
    
    const file = createReadStream(join(process.cwd(), 'uploads', filename));
    file.pipe(res);
  }
}
