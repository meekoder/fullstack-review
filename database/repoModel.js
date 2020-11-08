const db = require('./index');
const github = require('../helpers/github');

const saveRepo = (repo, cb) => {
  const query = 'INSERT INTO repos SET ? ON DUPLICATE KEY UPDATE ?';
  const args = [repo, repo];
  db.connection.query(query, args, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

const get25 = (cb) => {
  const query = 'SELECT * FROM repos';
  db.connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      let repos = [];
      data.forEach(d => repos.push(JSON.parse(JSON.stringify(d))));
      repos.sort((a, b) => {
        return b.stars - a.stars;
      });
      const top25 = repos.slice(0, 25);
      cb(top25);
    }
  });
}

module.exports = {
  saveRepo,
  get25
};
