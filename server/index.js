const express = require('express');
const parser = require('body-parser');
const github = require('../helpers/github');
const repoCtrl = require('../database/repoCtrl');
const repoModel = require('../database/repoModel');
const app = express();

const port = 3000;

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Invalid'
    });
  }
  
  github.getReposByUsername(body.username, (data) => {
    let counter = data.length;
    const cb = () => {
      counter--;
      if (!counter) {
        res.sendStatus(200);
      }
    }
    data.forEach(d => {
      const dbRepo = {
        repoId: d.id,
        repoName: d.name,
        repoUrl: d.html_url,
        stars: d.stargazers_count,
        username: d.owner.login,
        avatarUrl: d.owner.avatar_url,
        userUrl: d.owner.html_url
      };
      repoModel.saveRepo(dbRepo, cb);
    })
  });
});

app.get('/repos', (req, res) => {
  repoModel.get25((top) => {
    res.status(200).json(top);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
