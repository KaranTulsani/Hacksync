import schedule
import time
from llm.generate import generate
from utils.store import save_post
from config.settings import TOPICS

i = 0

def daily():
    global i
    topic = TOPICS[i % len(TOPICS)]
    data = generate(topic)
    save_post(data)
    print("Generated:", topic)
    i += 1

schedule.every().day.at("10:00").do(daily)

while True:
    schedule.run_pending()
    time.sleep(30)
