const PDFDocument = require('pdfkit');
const fs = require('fs');
const sizeOf = require('image-size');

export async function handleUpload (_event, imagePaths: string[]): Promise<string> {
      const result = await imageToPdf(imagePaths);
      return result;
  };

  async function imageToPdf(imagePaths: string[]): Promise<string>{
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({autoFirstPage: false});
        const outPutDir = 'C:\\Users\\mailb\\OneDrive\\Documents\\output.pdf';

        const writeStream = fs.createWriteStream(outPutDir); 
        doc.pipe(writeStream);
    
        imagePaths.forEach(imagePath => {
            const dimensions = sizeOf(imagePath);
            doc.addPage({size: [dimensions.width, dimensions.height]});
            doc.image(imagePath, 0, 0, {width: dimensions.width, height: dimensions.height})
        });
        doc.end();
        
        writeStream.on('finish', () => resolve('PDF creation succeeded'));
        writeStream.on('error', (error) => reject(`PDF creation failed: ${error.message}`));

      } catch (error) {
        if (error instanceof Error){
        reject(`PDF creation failed: ${error.message}`);
      }
      }


    })
 
  }
 