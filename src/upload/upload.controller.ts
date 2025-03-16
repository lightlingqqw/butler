import { UploadService } from './upload.service';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}


  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {

    console.log('调用了上传文件接口',file);
    return {
      filename: file.filename,
      path: file.path
    };
  }

}
