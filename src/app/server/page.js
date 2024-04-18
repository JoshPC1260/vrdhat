import puppeteer from 'puppeteer';
import fs from 'fs';
import fetch from 'node-fetch';
import { PDFDocument } from 'pdf-lib';
 
async function mergeImagesToPDF(church_name, imageFiles) {
  // Crea un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();
 
  // Recorre cada archivo de imagen
  for (const imageFile of imageFiles) {
    // Lee el contenido de la imagen
    const imageBytes = fs.readFileSync(imageFile);
 
    // Inserta la imagen en una nueva página del PDF
    const pdfImage = await pdfDoc.embedJpg(imageBytes);
    const imagePage = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
    imagePage.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: pdfImage.width,
      height: pdfImage.height,
    });
  }
 
  // Guarda el documento PDF en un archivo
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("api/reports/" + church_name +'.pdf', pdfBytes);
}
 
 
export default async function handler(req, res) {
   const church_name = "Test2"
  try {
 
 
    // Launch a new browser instance with puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      defaultViewport: {
          width             : 1920,
          height            : 945,
          deviceScaleFactor : 1
      }
  });
 
  const folderName = 'api/reports/' + church_name;
  try {

 
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
    const page = await browser.newPage();
    // Render the /full_report page server-side
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page1", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page1.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page2", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page2.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page3", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page3.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page4", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page4.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page6", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page6.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page7", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page7.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page8", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page8.jpg',
    });
    await page.goto("http://3.86.166.124:3000//complete_report#cr_page9", { waitUntil: 'networkidle0' });
    await page.screenshot({
      path:"reports/" + church_name + "/  " + 'cr_page9.jpg',
    });
    await browser.close();
 
    // Crear un array con las rutas de las imágenes capturadas
    const imageFiles = ["api/reports/" + church_name + "/  " + 'cr_page1.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page2.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page3.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page4.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page6.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page7.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page8.jpg',
                        "api/reports/" + church_name + "/  " + 'cr_page9.jpg']
 
    // Unir las imágenes en un PDF
    await mergeImagesToPDF(church_name, imageFiles);
 
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.log('Error generating PDF');
  }
}