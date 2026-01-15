from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

def post_tweet(text):
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    options.add_argument("--start-maximized")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.get("https://twitter.com/login")
    print("Login manually...")

    sleep(10)

    tweet_box = driver.find_element(By.CSS_SELECTOR, "div[contenteditable='true']")
    tweet_box.click()
    tweet_box.send_keys(text)

    sleep(1)
    input("Press ENTER to tweet...")

    driver.quit()
