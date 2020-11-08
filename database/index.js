const mysql = require('mysql');

const connection = mysql.createConnection(
  {
    user: 'root',
    password: 'root',
    database: 'repos'
  }
)

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Database connected!');
});

module.exports.connection = connection;
