import os
import psycopg2
from urllib.parse import urlparse

from data.pwds import Pwds

def get_db_connection():
    if 'DATABASE_URL' in os.environ:
        # Running on Heroku
        url = urlparse(os.environ['DATABASE_URL'])
        conn = psycopg2.connect(
            host=url.hostname,
            database=url.path[1:],
            user=url.username,
            password=url.password,
            port=url.port
        )
    else:
        # Local development
        from data.pwds import Pwds
        conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user="postgres",
            password=Pwds.pg_pwd,
            port="5432"
        )
    return conn
