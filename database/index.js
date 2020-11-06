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
  // This function should save a repo or repos to the MongoDB
  console.log('res data from db file' , body)
  const repo = new Repo(body);
  repo.save()
    .then((res) => console.log(res))
    .catch(e => console.log('error', e));
}

module.exports.save = save;
