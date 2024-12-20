**ROS Log Viewer and Analyzer**

A web-based application for uploading, parsing, and analyzing logs generated by robots running ROS (Robot Operating System). The application provides functionality to filter and search logs by severity level or keywords and download filtered results for further analysis.

**Features**
- Upload ROS Logs: Supports .log and .txt files.
- Log Parsing: Extracts key details like:
  - Timestamp
  - Log severity level (INFO, WARN, ERROR, DEBUG, FATAL)
  - Node name
  - Message content

- Interactive Table:
  - Displays parsed logs in a user-friendly table format.
  - Highlights WARN and ERROR logs for easy identification.
      
- Filters and Search:
  - Filter logs by severity level (e.g., only show ERROR logs).
  - Search for specific keywords in log messages.
      
- Download Logs: Download filtered logs as a JSON file for offline analysis.

**Technologies Used**

  **Frontend**
  - React.js: For building the user interface.
  - Material-UI: For UI components (table, dropdown, buttons).
  - Axios: For making REST API calls to the backend.
  
  **Backend**
  - Flask: For handling file uploads and log parsing.
  - Flask-CORS: To allow communication between frontend and backend.


**Installation and Setup**

**1. Clone the Repository**

    git clone https://github.com/<your-username>/ros-log-viewer.git
  
    cd ros-log-viewer

**2. Backend Setup**
   1. Navigate to the backend directory:

    cd backend
 
   2. Create and activate a virtual environment :

    python -m venv env
 
    source env/bin/activate  # For Linux/Mac
 
    env\Scripts\activate     # For Windows
 
   3. Install dependencies:

    pip install -r requirements.txt

   4. Start the Flask server:

    python app.py
 
   5. Flask server will run at http://localhost:8000.

**3. Frontend Setup**
   1. Navigate to the frontend directory:
  
          cd ../frontend
 
   2. Install dependencies:
  
          npm install
 
   3. Start the React development server:
  
          npm start
 
   4. React app will run at http://localhost:3000.

**4. Usage**
1. Open the frontend in your browser at http://localhost:3000.
2. Upload a .log or .txt file containing ROS logs.
3. View the logs displayed in a table.
4. Use filters or search to narrow down results.
5. Highlighted rows:
  - WARN: Yellow background
  - ERROR: Red background
6. Download filtered logs as a JSON file for offline use.


**Sample Log Format**

The application expects the uploaded log file to have the following format:

  [2024-12-11 11:31:58] [FATAL] [/camera_driver] Controller failure: robot entering SAFE mode.
 
  [2024-12-11 11:31:58] [INFO] [/path_planner] Lidar scan completed.
 
  [2024-12-11 11:31:58] [DEBUG] [/camera_driver] Initialized sensor data stream.

  [2024-12-11 11:31:59] [WARN] [/odom_publisher] High CPU usage detected on node /odom_publisher.


Each line should have:

- Timestamp: Enclosed in square brackets (e.g., [2024-12-11 11:31:58]).
- Severity: Enclosed in square brackets (e.g., [INFO], [WARN]).
- Node: Enclosed in square brackets (e.g., [/camera_driver]).
- Message: Descriptive text.

**Future Improvements**

- Add support for additional log formats.
- Implement advanced filtering (e.g., filter by time range or node).
- Support CSV export for filtered logs.
