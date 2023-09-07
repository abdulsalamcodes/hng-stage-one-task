const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Constants
const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DEFAULT_SLACK_NAME = "elhakamy";
const GITHUB_FILE_URL =
  "https://github.com/abdulsalamcodes/hng-stage-one-task/blob/main/index.js";
const GITHUB_REPO_URL = "https://github.com/abdulsalamcodes/hng-stage-one-task";

app.get("/api", (req, res) => {
  try {
    const query = req.query;
    const currentDate = new Date();

    const dayOfWeek = DAYS_OF_WEEK[currentDate.getDay()];

    function getUTCDateString() {
      const year = currentDate.getUTCFullYear();
      const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getUTCDate()).padStart(2, "0");
      const hours = String(currentDate.getUTCHours()).padStart(2, "0");
      const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    const utcTimestamp = getUTCDateString();

    const responseBody = {
      slack_name: query.slack_name || DEFAULT_SLACK_NAME,
      current_day: dayOfWeek,
      utc_time: utcTimestamp,
      track: query.track || "Backend",
      github_file_url: GITHUB_FILE_URL,
      github_repo_url: GITHUB_REPO_URL,
      status_code: 200,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
