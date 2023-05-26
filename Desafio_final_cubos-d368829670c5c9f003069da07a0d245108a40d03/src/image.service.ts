import { Injectable } from '@nestjs/common';
import * as B2 from 'backblaze-b2';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImageService {
    constructor(private readonly backblaze: B2) { }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const filename = `${uuid()}-${file.originalname}`; // gera um nome de arquivo único

        const stream = fs.readFileSync(file.path);

        const response = await this.backblaze.uploadFile({
            filename,
            data: stream,
            bucketId: process.env.B2_BUCKET_ID,
        });

        // Exclua o arquivo temporário após o upload
        await fs.rmSync(file.path);

        return response.data.fileName;
    }
}
