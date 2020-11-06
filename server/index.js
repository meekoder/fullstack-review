const express = require('express');
const repoCtrl = require('../database/index');
const parser = require('body-parser');
const axios = require('axios');
const github = require('../helpers/github');

const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Invalid'
    });
  }
  github.getReposByUsername('meeko', (data) => {
    data.forEach(d => {
      const dbRepo = {
        repoId: d.id,
        repoName: d.name,
        repoUrl: d.html_url,
        owner: {
          login: d.owner.login,
          avatarUrl: d.owner.avatar_url,
          userId: d.owner.id,
          userUrl: d.owner.html_url,
        }
      };
      repoCtrl.save(dbRepo);
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

const port = 1128;

app.listen(port, () => console.log(`listening on port ${port}`));
