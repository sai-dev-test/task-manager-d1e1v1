from fastapi import FastAPI
from pymongo import MongoClient
import os

app = FastAPI()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017")
client = MongoClient(MONGO_URI)
db = client["taskdb"]
collection = db["tasks"]

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.get("/tasks")
def get_tasks():
    tasks = list(collection.find({}, {"_id": 0}))
    return tasks

@app.post("/tasks")
def add_task(task: dict):
    collection.insert_one(task)
    return {"message": "Task added"}
