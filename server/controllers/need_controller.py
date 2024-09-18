from flask import request, jsonify
from config.db import get_db_connection

def create_need(user_id):
    data = request.get_json()
    needs = data['needs']
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO daily_logs (user_id, date) VALUES (%s, CURRENT_DATE) RETURNING id",
            (user_id,)
        )
        daily_log_id = cur.fetchone()[0]

        for need in needs:
            cur.execute(
                "INSERT INTO daily_needs (daily_log_id, need) VALUES (%s, %s)",
                (daily_log_id, need)
            )

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Needs created successfully"}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500