from flask import request, jsonify
from config.db import get_db_connection

import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def get_user():
    data = request.get_json()
    name = data['name']
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE name = %s", (name,))
        existing_user = cur.fetchone()
        logging.debug(f'existing_user: {existing_user}')
        if existing_user:
            user_id = existing_user[0]
        else:
            cur.execute("INSERT INTO users (name) VALUES (%s) RETURNING id", (name,))
            user_id = cur.fetchone()[0]
        logging.debug(f'user_id: {user_id}')
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"userId": user_id}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500