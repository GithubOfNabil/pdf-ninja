const PDFDocument = require('pdfkit');
const fs = require('fs');
const sizeOf = require('image-size');


export async function handleImageToPdf (event,pathSave:string, imagePaths: string[]): Promise<string> {
      const result = await imageToPdf(pathSave,imagePaths);
      event.reply('response', result)
      return result;
  };

  async function imageToPdf(pathSave:string ,imagePaths: string[]): Promise<string>{
    return new Promise((resolve, reject) => {
      try {
        const time = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
        const fileName = `pdf-${time}.pdf`;
        
        const doc = new PDFDocument({size:'A4', autoFirstPage: false});
        const outPutDir = `${pathSave}${fileName}`;

        const writeStream = fs.createWriteStream(outPutDir); 
        doc.pipe(writeStream);
       
        // A4 page dimensions in points
  const pageWidth = 595.28;
  const pageHeight = 841.89;

  imagePaths.forEach((imagePath) => {
    // Get the dimensions of the image
    const dimensions = sizeOf(imagePath);
    const imageWidth = dimensions.width;
    const imageHeight = dimensions.height;

    // Calculate the scale to fit the image to the page
    const scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);
    const scaledWidth = imageWidth * scale;
    const scaledHeight = imageHeight * scale;

    // Calculate the position to center the image
    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;

    // Add a new page
    doc.addPage({
      size: 'A4',
      layout: 'portrait',
      margin: 0
    });

    // Draw the image
    doc.image(imagePath, x, y, { width: scaledWidth, height: scaledHeight });
  });


        doc.end();
        
        writeStream.on('finish', () => resolve('succeeded'));
        writeStream.on('error', (error) => reject(`failed: ${error.message}`));

      } catch (error) {
        if (error instanceof Error){
        reject(`PDF creation failed: ${error.message}`);
      }
      }


    })
 
  }
 