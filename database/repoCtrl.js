const db = require('./index.js');
const model = require('./repoModel.js');

get = (req, res) => {
  model.getRepos((err, data) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.send(data);
  });
};

module.exports = {get};
