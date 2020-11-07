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
    stars: Number,
    owner: {
      login: String,
      avatarUrl: String,
      userId: Number,
      userUrl: String
    }
  }
);

const Repo = mongoose.model('Repo', repoSchema);

const save = (dbRepo, cb) => {
  // This function should save a repo or repos to the MongoDB
  Repo.find({repoId: dbRepo.repoId}, (err, docs) => {
    if (!docs.length) {
      const repo = new Repo(dbRepo);
      repo.save()
        .then((res) => {
          console.log(res);
          cb();
        })
        .catch(e => console.log('error', e));
    }
  });
}

const get25 = (cb) => {
  Repo.find({}, (err, docs) => {
    let convertedDocs = [];
    docs.forEach(x => convertedDocs.push(x.toObject()));
    convertedDocs.sort((a, b) => {
      return b.stars - a.stars;
    });
    const top25 = convertedDocs.slice(0, 25);
    cb(top25);
  })
  // get first 25 in alphabetical order
  // Repo.find({}, (err, docs) => {
  //   let convertedDocs = [];
  //   docs.forEach(x => convertedDocs.push(x.toObject()));
  //   convertedDocs.sort((a, b) => {
  //     const repoNameA = a.repoName.toUpperCase();
  //     const repoNameB = b.repoName.toUpperCase();
  //     if (repoNameA < repoNameB) {
  //       return -1;
  //     }
  //     if (repoNameA > repoNameB) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   const top25 = convertedDocs.slice(0, 25);
  //   cb(top25);
  // });
}

module.exports = {
  save,
  get25
};
