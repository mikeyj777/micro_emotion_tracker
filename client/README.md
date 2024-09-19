# Emotion Tracker Backend

This is the backend server for the Emotion Tracker application.

## Requirements

- Python 3.x
- Flask
- PostgreSQL

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/mikeyj777/micro_emotion_tracker.git
   ```

Backend - Flask & PostgreSQL

2. Navigate to the backend project directory:
   ```
   cd server
   ```

3. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Create a new PostgreSQL database.
   - Update the database connection details in `config/db.py`.

5. Start the server:
   ```
   python app.py
   ```


The backend server will start running on `http://localhost:5000`.

Front end - React

6.  Navigate to front end project directory.
    ```
    cd client
    ```

7.  Install the required react components and dependencies:
    ```
    npm install
    ```

8.  Start the server:
    ```
    npm start
    ```
The frontend server will start running on `http://localhost:3000`.

## API Endpoints

- `POST /api/users`: Create a new user.
- `GET /api/emotions/<user_id>`: Get emotions for a user.
- `POST /api/emotions/<user_id>`: Create emotions for a user.
- `POST /api/needs/<user_id>`: Create needs for a user.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).