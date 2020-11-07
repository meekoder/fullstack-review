const mongoose = require('mongoose');

mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect('mongodb://localhost:27017/fetcher');

const repoSchema = mongoose.Schema(
  {
    repoId: Number,
    repoName: String,
    repoUrl: String,
    owner: {
      login: String,
      avatarUrl: String,
      userId: Number,
      userUrl: String
    }
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

const get25 = () => {
  Repo.find({}, (err, docs) =>{
    let convertedDocs = [];
    docs.forEach(x => convertedDocs.push(x.toObject()));
    convertedDocs.sort((a, b) => {
      const repoNameA = a.repoName.toUpperCase();
      const repoNameB = b.repoName.toUpperCase();
      if (repoNameA < repoNameB) {
        return -1;
      }
      if (repoNameA > repoNameB) {
        return 1;
      }
      return 0;
    });
    console.log(convertedDocs)
  });
  
}

module.exports = {
  save,
  get25
};
