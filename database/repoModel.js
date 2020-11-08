const db = require('./index');
const github = require('../helpers/github');


const getRepos = (cb) => {
  const query = 'SELECT * FROM repos';
  db.connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      console.log(data);
      cb(null, data);
    }
  });
}

const saveRepo = (repo, cb) => {
  const query = 'INSERT INTO repos SET ? ON DUPLICATE KEY UPDATE ?';
  const args = [repo, repo];
  db.connection.query(query, args, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      console.log(data);
      cb(null, data);
    }
  });
}

module.exports = {
  getRepos,
  saveRepo
};
