import { BadRequestException, Injectable, Post } from '@nestjs/common';

import * as fs from 'fs';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { json } from 'stream/consumers';
import { BaseExceptionFilter } from '@nestjs/core';
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


        try {

            const data = await fs.readFileSync(file.path);

            const time = new Date().getTime().toString();
            const filename = `${randomUUID()}-${file.originalname}`;

            const uploadParams = ({
                Bucket: process.env.B2_BUCKET_NAME,
                Key: `${filename}`,
                Body: data,
                ContentType: file.mimetype,

            })


            const uploadCommand = new PutObjectCommand(uploadParams);
            const response = await this.s3Client.send(uploadCommand);

            return { 'Upload realizado com sucesso:': response }
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
            if (objects === undefined) {
                return [];
            }


            return { 'Lista de objetos:': objects };
        } catch (error) {
            console.error("Error listing and downloading objects:", error);
        }
        return null;
    }
    async deleteArquivo(url: string) {



        const deleteParams = ({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: `${url}`,
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

    async consultarImagem(url: string) {
        const imagens = await this.listarArquivos();

        const string1 = JSON.stringify(imagens)
        const string2 = JSON.parse(string1)
        const string3 = string2['Lista de objetos:']

        const string5 = string3.filter((item) => {

            return item.Key == `${url}`
        })

        if (string5.length === 0) {
            throw new BadRequestException(`Id ${url} não encontrado`);

        } else {
            return string5;


        }
    }
}
