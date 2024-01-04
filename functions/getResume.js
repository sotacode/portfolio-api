const client_s3 = require("@aws-sdk/client-s3");


module.exports.handler = async (event) => {
  const client = new client_s3.S3Client({  });
  const params = {
    Bucket: `${process.env.STAGE}-${process.env.BUCKET_RESUME}`,
    Key: process.env.NAME_FILE_RESUME,
  };
  const command = new client_s3.GetObjectCommand(params);
  try {
    const data = await client.send(command);
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      data.Body.on('data', chunk => chunks.push(chunk));
      data.Body.on('error', reject);
      data.Body.on('end', () => resolve(Buffer.concat(chunks)));
    });
    const base64Pdf = pdfBuffer.toString('base64');
    return {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: base64Pdf,
    };
  } catch (err) { 
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};