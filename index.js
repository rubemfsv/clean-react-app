const fallback = require('express-history-api-fallback');
const express = require('express');
const app = express();
const root = `${__dirname}/dist`;
app.use(express.static(root));
app.get('/', function (req, res) {
  res.render(fallback('index.html', { root }));
});
app.listen(process.env.port || 3000);
