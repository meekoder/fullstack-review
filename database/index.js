const mongoose = require('mongoose');
const github = require('../helpers/github');
mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect('mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema(
  {
    repoId: Number,
    repoName: String,
    owner: {
      login: String,
      avatarUrl: String,
      userId: Number,
      userUrl: String,
      reposUrl: String
    },
    repoUrl: String
  }
);

let Repo = mongoose.model('Repo', repoSchema);

let save = (body) => {
  console.log('body', body)
  // This function should save a repo or repos to the MongoDB
  const repo = new Repo(body);
  console.log('repo', repo)
  repo.save()
    .then(() => github.getReposByUsername(body.owner.login))
    .catch(e => console.log('error', e));
}

module.exports.save = save;
