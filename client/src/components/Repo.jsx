import React from 'react';

const Repo = (props) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <a href={props.repo.userUrl}>
              <img src={props.repo.avatarUrl} />
            </a>
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <a href={props.repo.repoUrl}>
                <strong>{props.repo.repoName}</strong> 
              </a>
            </p>
            <small>{props.repo.username}</small> 
            <div>
              <span className="icon is-small">
                <i className="far fa-star" aria-hidden="true"></i>
                <small>{props.repo.stars}</small>
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Repo;
