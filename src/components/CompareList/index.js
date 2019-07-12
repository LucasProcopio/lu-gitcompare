import React from "react";
import PropTypes from "prop-types";

import { Container, Repository } from "./style";

const CompareList = ({ repositories }) => {
  return (
    <Container>
      {repositories.map(repo => (
        <Repository key={repo.id}>
          <div className="action">
            <i className="fa fa-undo sync" />
            <i className="fa fa-trash delete" />
          </div>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <strong>{repo.name}</strong>
            <small>{repo.owner.login}</small>
          </header>
          <ul>
            <li>
              {repo.stargazers_count} <small>stars</small>
            </li>
            <li>
              {repo.forks_count} <small>forks</small>
            </li>
            <li>
              {repo.open_issues_count} <small>issues</small>
            </li>
            <li>
              {repo.lastCommit} <small>last commit</small>
            </li>
          </ul>
        </Repository>
      ))}
    </Container>
  );
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      forks_count: PropTypes.number,
      lastCommit: PropTypes.string
    })
  ).isRequired
};

export default CompareList;
