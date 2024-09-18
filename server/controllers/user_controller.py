from flask import request, jsonify
from config.db import get_db_connection

def create_user():
    data = request.get_json()
    name = data['name']
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (name) VALUES (%s) RETURNING id", (name,))
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"userId": user_id}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500