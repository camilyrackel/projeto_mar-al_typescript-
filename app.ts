const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/');
const port = 3000;

app.use(express.json());
app.use(cors()); // Correct usage of cors middleware
app.use(routes);
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
