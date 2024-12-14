import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

function App() {
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [severityFilter, setSeverityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(
        error.response && error.response.data
          ? `Error: ${error.response.data.error}`
          : "Failed to upload and process the file. Check the console for details."
      );
    }
  };

  const filteredLogs = logs.filter(
    (log) =>
      (severityFilter === "" || log.severity === severityFilter) &&
      (searchTerm === "" || log.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const downloadLogs = () => {
    const jsonBlob = new Blob([JSON.stringify(filteredLogs, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "filtered_logs.json";
    link.click();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ROS Log Viewer
      </Typography>

      <div>
        <input type="file" accept=".log,.txt" onChange={handleFileUpload} />
        <Button variant="contained" onClick={uploadFile} style={{ marginLeft: "10px" }}>
          Upload
        </Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
        <Select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          displayEmpty
          style={{ marginRight: "20px" }}
        >
          <MenuItem value="">All Severities</MenuItem>
          <MenuItem value="INFO">INFO</MenuItem>
          <MenuItem value="WARN">WARN</MenuItem>
          <MenuItem value="ERROR">ERROR</MenuItem>
          <MenuItem value="DEBUG">DEBUG</MenuItem>
          <MenuItem value="FATAL">FATAL</MenuItem>
        </Select>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "20px" }}
        />
        {/* Download Button Beside Search Bar */}
        <Button variant="contained" onClick={downloadLogs}>
          Download Filtered Logs
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Node</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLogs.map((log, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor:
                  log.severity === "ERROR"
                    ? "#ffcccc"
                    : log.severity === "WARN"
                    ? "#fff4cc"
                    : "transparent",
              }}
            >
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.severity}</TableCell>
              <TableCell>{log.node}</TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
