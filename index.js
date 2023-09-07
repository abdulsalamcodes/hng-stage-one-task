const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  try {
    const query = req.query;
    const currentDate = new Date("2023-09-07T20:56:48Z");

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const utcTimeWithoutMilliseconds = currentDate.toISOString().split('.')[0] + 'Z';


    const responseBody = {
      slack_name: query.slack_name || "elhakamy",
      current_day: dayOfWeek,
      utc_time: utcTimeWithoutMilliseconds,
      track: query.track || "Backend",
      github_file_url: "https://github.com/abdulsalamcodes/hng-stage-one-task/blob/main/index.js",
      github_repo_url: "https://github.com/abdulsalamcodes/hng-stage-one-task",
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
