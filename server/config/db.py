import psycopg2

from data.pwds import Pwds

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password=Pwds.pg_pwd,
        port="5432"
    )
    return conn

