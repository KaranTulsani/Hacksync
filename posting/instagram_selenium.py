from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

def post_instagram(text, image_path):
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.get("https://instagram.com")
    print("Login manually...")
    sleep(10)

    input("Open new post upload + press ENTER here...")

    # after user uploads image
    caption_box = driver.find_element(By.TAG_NAME, "textarea")
    caption_box.send_keys(text)

    input("Press ENTER after posting...")
    driver.quit()
