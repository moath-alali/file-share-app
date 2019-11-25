const conf = {};
conf.accessKeyId = 'AKIA4VY255NDGYL66TNO';
conf.secretAccessKey = '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';
conf.smtp = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
};
conf.url = 'http://localhost:5000';
conf.externalURL = 'http://localhost:3000';
conf.s3Config = {
    accessKeyId: conf.accessKeyId,
    secretAccessKey: conf.secretAccessKey
};
conf.s3Region = 'us-west-2';
conf.s3Bucket = 'file-share-app-storage';
conf.MONGO_URLLocal='mongodb://127.0.0.1:27017/file-share-app';
conf.jwtSecret='abc123';
conf.PORT=5000;
conf.sendGridKey='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';
conf.MONGO_URL='mongodb+srv://root:m123123123@cluster0-yxyjo.gcp.mongodb.net/file-share-app?retryWrites=true&w=majority';
module.exports = conf;