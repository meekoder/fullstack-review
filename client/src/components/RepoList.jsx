import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div className='repos'>
    {props.repos.map(repo => <Repo key={repo.id} repo={repo} />)}
  </div>
)

export default RepoList;
