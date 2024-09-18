from flask import request, jsonify
from config.db import get_db_connection

def get_emotions(user_id):
    days = request.args.get('days', 7)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT
                date,
                SUM(CASE WHEN e.is_positive THEN 1 ELSE 0 END) AS "positiveCount",
                SUM(CASE WHEN e.is_positive THEN 0 ELSE 1 END) AS "negativeCount"
            FROM daily_logs dl
            JOIN daily_emotions de ON dl.id = de.daily_log_id
            JOIN emotions e ON de.emotion_id = e.id
            WHERE dl.user_id = %s
            GROUP BY date
            ORDER BY date DESC
            LIMIT %s
        """, (user_id, days))
        emotions = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(emotions)
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

def create_emotion(user_id):
    data = request.get_json()
    emotions = data['emotions']
    emotion_type = data['type']
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO daily_logs (user_id, date) VALUES (%s, CURRENT_DATE) RETURNING id",
            (user_id,)
        )
        daily_log_id = cur.fetchone()[0]

        for emotion in emotions:
            cur.execute(
                "SELECT id FROM emotions WHERE name = %s AND is_positive = %s",
                (emotion, emotion_type == 'positive')
            )
            emotion_id = cur.fetchone()[0]
            cur.execute(
                "INSERT INTO daily_emotions (daily_log_id, emotion_id) VALUES (%s, %s)",
                (daily_log_id, emotion_id)
            )

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Emotions created successfully"}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500