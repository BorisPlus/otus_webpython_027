FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
COPY requirements.txt /code/
RUN pip install -r /code/requirements.txt
COPY ./django_admin_features /code/django_admin_features
COPY ./core_app /code/core_app
COPY ./flood_app /code/flood_app
COPY ./mysite /code/mysite
COPY ./db.sqlite3 /code/db.sqlite3
COPY ./manage.py /code/manage.py
ENTRYPOINT [ "python3", "/code/manage.py", "runserver", "0.0.0.0:8000" ]
