import { Injectable, Post } from '@nestjs/common';

import * as fs from 'fs';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { json } from 'stream/consumers';
//import { ListObjectsV2Command } from '@aws-sdk/client-s3';


const axios = require('axios');
//const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


@Injectable()
export class UploadService {

    private s3Client: S3Client;
    constructor() {
        this.s3Client = new S3Client({
            region: "us-west-1",
            endpoint: "https://s3.us-east-005.backblazeb2.com",
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            },
        });
    }
    async uploadImage(file: Express.Multer.File): Promise<any> {




        const data = file.buffer;



        const time = new Date().getTime().toString();
        const filename = `${randomUUID()}-${file.originalname}`;

        const uploadParams = ({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: `${filename}`,
            Body: data,
            ContentType: file.mimetype,

        })


        const uploadCommand = new PutObjectCommand(uploadParams);
        try {
            const response = await this.s3Client.send(uploadCommand);
            console.log('Upload realizado com sucesso:', response);

        } catch (error) {
            console.log(error);
            throw new Error('Erro ao fazer o upload da imagem');
        } finally {
            // Remove o arquivo local após o upload
            await fs.rmSync(file.path);
        }
    }

    async listarArquivos() {



        const listObjectsCommand = new ListObjectsV2Command({
            Bucket: process.env.B2_BUCKET_NAME,
        });
        try {
            const response = await this.s3Client.send(listObjectsCommand);
            const objects = response.Contents;

            return objects;
        } catch (error) {
            console.error("Error listing and downloading objects:", error);
        }
        return null;
    }
    async deleteArquivo(url: string) {



        const string2 = url.split('/')
        const string3 = string2[string2.length - 1]
        const deleteParams = ({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: `${string3}`,
        })
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        try {
            const response = await this.s3Client.send(deleteCommand);
            console.log('Objeto removido com sucesso:', response);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
