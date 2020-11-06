const mongoose = require('mongoose');

mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect('mongodb://localhost:27017/fetcher');

const repoSchema = mongoose.Schema(
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

const Repo = mongoose.model('Repo', repoSchema);

const save = (dbRepo) => {
  // This function should save a repo or repos to the MongoDB
  Repo.find({repoId: dbRepo.repoId}, (err, docs) => {
    if (!docs.length) {
      const repo = new Repo(dbRepo);
      repo.save()
        .then((res) => console.log(res))
        .catch(e => console.log('error', e));
    }
  });
}

module.exports.save = save;
