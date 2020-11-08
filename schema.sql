DROP DATABASE repos;
CREATE DATABASE repos;

USE repos;

CREATE TABLE repos (
  id INT NOT NULL AUTO_INCREMENT,
  repoid BIGINT,
  repoName VARCHAR(255),
  repoUrl VARCHAR(255),
  stars BIGINT,
  username VARCHAR(255),
  avatarUrl VARCHAR(255),
  userUrl VARCHAR(255),
  PRIMARY KEY (id)
);
