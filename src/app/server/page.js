import puppeteer from 'puppeteer';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Launch a new browser instance with puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
 
    // Render the /full_report page server-side
    await page.goto("http://54.221.79.123:8080/complete_report");

    const pdfOptions = {
      format: 'Legal', // Adjust format as needed
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      printBackground: true, // Enable background printing
      landscape: true
    };
 
    // Generate a PDF from the rendered HTML
    const pdf = await page.pdf(pdfOptions);
    console.log("Generated PDF");
    fs.writeFileSync("./api/report.pdf", pdf)
    console.log("saved pdf")
    
 
    // Close the browser instance
    await browser.close();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.log('Error generating PDF');
  }
}