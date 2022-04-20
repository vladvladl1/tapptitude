require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config({path: "../.env"});

const s3 = new AWS.S3({
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.region,
});

type PutObjectResponse = {path:string, message:string};

export class ResourceService {
    async uploadFile(file: Express.Multer.File, customerId: string){
        try {
            const response = await new Promise<PutObjectResponse>((res, rej) => {
                const params = {
                    Body: JSON.stringify(file),
                    Bucket: process.env.BUCKET_NAME,
                    Key: `Driving_license/${customerId}/${file.filename}.jpg`,
                };
                s3.putObject(params, function (err, data) {
                    if (err){rej(err);}
                    else {
                        res({
                            path: `Driving_license/${customerId}/${file.filename}.jpg`,
                            message: "Photo uploaded"
                        });
                    }
                });
            });
            console.log("s-a trimis cica");
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    getFileUrl(path: string) {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Expires: 180,
        };

        let url = s3.getSignedUrl("getObject", params);
        console.log("The URL is", url);
        return url;
    }
}