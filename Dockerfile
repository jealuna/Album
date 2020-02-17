FROM python:3.7-stretch
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
COPY . /code/
WORKDIR /code
RUN sudo apt-get install python3-dev
RUN pip install -r requirements.txt