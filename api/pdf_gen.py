import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from PIL import Image
from pdf2image import convert_from_path
import img2pdf
 
def merge_images_to_pdf(church_name, image_files):
    images_data = []
    for image_file in image_files:
        with open(image_file, 'rb') as f:
            images_data.append(f.read())
 
    pdf_path = f"reports/{church_name}.pdf"
    with open(pdf_path, "wb") as pdf_file:
        pdf_file.write(img2pdf.convert(images_data))


def generate(church_name):
    try:
        # Launch a new browser instance with Selenium
        service = Service(ChromeDriverManager().install())
        options = webdriver.ChromeOptions()
        options.add_argument("--window-size=900,500")
        options.add_argument("--hide-scrollbars")
        options.add_argument("--headless=new")
        #options.add_argument("--force-device-scale-factor=1.5")
        driver = webdriver.Chrome(service=service, options=options)
        driver.maximize_window()
        church_name = church_name.replace(" ", "_")
        folder_name = f"reports/{church_name}"

        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
 
        # Render the /complete_report page server-side
        driver.get("http://3.86.166.124:3000/complete_report#cr_page1")
        driver.save_screenshot(f"{folder_name}/cr_page1.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page2")
        driver.save_screenshot(f"{folder_name}/cr_page2.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page3")
        driver.save_screenshot(f"{folder_name}/cr_page3.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page4")
        driver.save_screenshot(f"{folder_name}/cr_page4.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page6")
        driver.save_screenshot(f"{folder_name}/cr_page6.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page7")
        driver.save_screenshot(f"{folder_name}/cr_page7.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page8")
        driver.save_screenshot(f"{folder_name}/cr_page8.png")
 
        driver.get("http://3.86.166.124:3000/complete_report#cr_page9")
        driver.save_screenshot(f"{folder_name}/cr_page9.png")
 
        driver.quit()
 
        # Create a list of image file paths
        image_files = [
            f"{folder_name}/cr_page1.png",
            f"{folder_name}/cr_page2.png",
            f"{folder_name}/cr_page3.png",
            f"{folder_name}/cr_page4.png",
            f"{folder_name}/cr_page6.png",
            f"{folder_name}/cr_page7.png",
            f"{folder_name}/cr_page8.png",
            f"{folder_name}/cr_page9.png",
        ]
 
        # Merge images to PDF
        merge_images_to_pdf(church_name, image_files)
 
        print("PDF report generated successfully")
    except Exception as e:
        print(f"Error generating PDF: {e}")
 