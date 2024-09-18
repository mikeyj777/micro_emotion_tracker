from flask import Flask
from controllers.user_controller import create_user
from controllers.emotion_controller import get_emotions, create_emotion
from controllers.need_controller import create_need

app = Flask(__name__)

@app.route('/api/users', methods=['POST'])
def user_route():
    return create_user()

@app.route('/api/emotions/<int:user_id>', methods=['GET'])
def get_emotions_route(user_id):
    return get_emotions(user_id)

@app.route('/api/emotions/<int:user_id>', methods=['POST'])
def create_emotion_route(user_id):
    return create_emotion(user_id)

@app.route('/api/needs/<int:user_id>', methods=['POST'])
def create_need_route(user_id):
    return create_need(user_id)

if __name__ == '__main__':
    app.run(debug=True)