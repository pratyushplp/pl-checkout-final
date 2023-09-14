FROM python:3.9
LABEL name="backend"
LABEL version="latest"
WORKDIR /server
COPY ./requirements.txt .
RUN pip install -r requirements.txt
RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]