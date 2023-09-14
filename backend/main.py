from typing import Union
from typing import List
from fastapi import FastAPI,File, UploadFile,Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from azure.storage.blob.aio import BlobServiceClient
import uuid
import os
import random
from http.client import HTTPSConnection

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
url=""
url_path=""

# define parameters
url = os.environ["main_url"]
url_path = os.environ["path"]

blob_connection_string = os.environ["AZURE_STORAGE_CONNECTION_STRING"]
container_name = os.environ["container_one"]


# define functions
@app.get('/')
def root():
    return {"message": "This is the root level of GPTInsight application!"}


@app.post("/score")
async def get_score(request: Request, prompt: dict, url: str = url, url_path: str = url_path):
    session_id = request.headers.get("sessionId")
    question_id = uuid.uuid4().hex
    response = {}
    response["sessionId"] = session_id
    response["questionId"] = question_id

    conn = HTTPSConnection(url)
    payload = json.dumps(prompt)
    conn.request('POST', url_path, payload)
    response = conn.getresponse()
    result = response.read()
    response["answer"] = result.decode('utf-8')

    return response


@app.post("/files")
async def upload_files(request: Request, files: List[UploadFile] = File()):
    # NOTE: the files name in the frontend and the argument name (i.e. files) in the function MUST be the same
    session_id = request.headers.get("sessionId") if request.headers.get("sessionId") else "default"
    service_client = BlobServiceClient.from_connection_string(blob_connection_string)
    async with service_client:
        container_client = service_client.get_container_client(container_name)
        try:
            for file in files:
                blob_client = container_client.get_blob_client(f'{session_id}/{file.filename}')
                read_file = await file.read()
                await blob_client.upload_blob(read_file, overwrite=True)
            return {}
        except Exception as e:
            print(e)


@app.get("/generateSession")
async def generate_session_id():
    temp_id = uuid.uuid4().hex
    # write code to check if uuid is already present in the database, if its already present generate a new one
    exists = False  # replace with looking up in db
    while exists:
        temp_id = uuid.uuid4().hex
        # exists = check in db
    return {"sessionId": temp_id}


@app.post("/ratings")
async def ratings(request: Request, rating: dict):
    session_id = request.headers.get("sessionId")
    print(f"session_id: {session_id} questionId: {rating.get('questionId')}, isLike: {rating.get('isLike')}, "
          f"isDislike: {rating.get('isDislike')}")
    # TODO: if value already present, update in db. If value is not present save to db


@app.post("/feedback")
async def feedback(request: Request, feedback: dict):
    session_id = request.headers.get("sessionId")
    print(f"session_id: {session_id} questionId: {feedback.get('questionId')}, feedback: {feedback.get('feedback')}")
    # TODO: if value already present, update in db. If value is not present save to db


# uvicorn test:app –reload
