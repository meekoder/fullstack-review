import React from 'react';

const Repo = (props) => {
  return (
    <div className='repo'>
      <a href={props.repo.repoUrl}>
        <h3>{props.repo.repoName}</h3>
      </a>
      <p>{props.repo.owner.login}</p>
      <a href={props.repo.owner.userUrl}>
        <img src={props.repo.owner.avatarUrl} />
      </a>
      <h4>{props.repo.stars}</h4>
    </div>
    
  )
}

export default Repo;
