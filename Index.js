const express = require("express");
const bodyParser = require("body-parser");

const student = require("./routes/student");
const staff = require("./routes/staff");
const admin = require("./routes/admin");

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Valid API Keys.
apiKeys = ["dublinschools", "ds-district", "data-for-schools"];

// New middleware to check for API keys!
app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

  // Checking for the absence of a key.
  if (!key) next(error(400, "API Key Required"));

  // Checking for key validity.
  if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));

  // Valid key! Storing it in req.key for route access.
  req.key = key;
  next();
});

// Using Routes
app.use("/api/student", student);
app.use("/api/staff", staff);
app.use("/api/admin", admin);

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/student",
        rel: "student",
        type: "GET",
      },
      {
        href: "api/student",
        rel: "student",
        type: "POST",
      },
      {
        href: "api/staff",
        rel: "staff",
        type: "GET",
      },
      {
        href: "api/staff",
        rel: "staff",
        type: "POST",
      },
      {
        href: "api/admin",
        rel: "admin",
        type: "GET",
      },
      {
        href: "api/admin",
        rel: "admin",
        type: "POST",
      },
    ],
  });
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Error-handling middleware.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
