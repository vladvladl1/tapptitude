require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3({
    accesKeyId: "S3iddrivinglicense",
    secretAccessKey: "secret",
    region: "eu-central-1",
});
class ResourceService {
    async uploadFile(file, customerId) {
        try {
            const response = await new Promise((res, rej) => {
                var params = {
                    Body: file,
                    Bucket: process.env.BUCKET_NAME,
                    Key: `Driving_license/${customerId}/${file.name}.jpg`,
                };
                s3.putObject(params, function (err, data) {
                    if (err)
                        rej(err);
                    else
                        res({
                            path: `Driving_license/${customerId}/${file.name}.jpg`,
                            message: "Photo uploaded",
                        });
                });
            });
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    getFileUrl(path) {
        let params = {
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Expires: 180,
        };
        let url = s3.getSignedUrl("getObject", params);
        console.log("The URL is", url);
        return url;
    }
}
//# sourceMappingURL=s3drivingLicense.js.map