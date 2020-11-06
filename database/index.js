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
      userUrl: String
    },
    repoUrl: String
  }
);

let Repo = mongoose.model('Repo', repoSchema);

let save = (dbRepo) => {
  // This function should save a repo or repos to the MongoDB
  console.log('res data from db file' , dbRepo)
  const repo = new Repo(dbRepo);
  Repo.find({repoId: dbRepo.repoId}, (err, docs) => {
    if (!docs.length) {
      repo.save()
        .then((res) => console.log(res))
        .catch(e => console.log('error', e));
    }
  })
}

module.exports.save = save;
