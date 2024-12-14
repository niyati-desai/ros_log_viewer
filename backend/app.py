from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploaded_files'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to parse custom log format
def parse_custom_log_file(filepath):
    logs = []
    # Define a regex pattern to match the log format
    log_pattern = re.compile(r'\[(.*?)\] \[(.*?)\] \[(.*?)\] (.*)')
    try:
        with open(filepath, 'r') as file:
            for line in file:
                match = log_pattern.match(line.strip())
                if match:
                    logs.append({
                        "timestamp": match.group(1),  # Group 1: Timestamp
                        "severity": match.group(2),  # Group 2: Severity
                        "node": match.group(3),      # Group 3: Node
                        "message": match.group(4)    # Group 4: Message
                    })
    except Exception as e:
        raise ValueError(f"Error parsing file: {str(e)}")
    return logs

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided in the request."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected."}), 400

    # Save the uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        file.save(filepath)
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

    # Parse the log file
    try:
        logs = parse_custom_log_file(filepath)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

    # Return the parsed logs
    return jsonify({"logs": logs})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
