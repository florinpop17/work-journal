import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    state = {
        clientId: '185028a6af3e104da694',
        clientSecret: 'c19643b7e227533c16773b3fb89e50d42eba0e8b',
        count: 5,
        sort: 'created: asc',
        repos: []
    };

    componentDidMount = () => {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then(res => res.json())
            .then(data => {
                // Fix an error in React
                if (this.state.repos.length === 0) {
                    this.setState({ repos: data });
                }
            })
            .catch(e => console.error(e));
    };
    render() {
        const { repos } = this.state;

        return (
            <div>
                <hr />
                <h3 className="mb-4">Laters Github Repos</h3>
                {repos.length > 0
                    ? repos.map(repo => (
                          <div key={repo.id} className="card card-body mb-2">
                              <div className="row">
                                  <div className="col-md-6">
                                      <h4>
                                          <Link
                                              to={repo.html_url}
                                              className="text-info"
                                              target="_blank"
                                          >
                                              {repo.name}
                                          </Link>
                                      </h4>
                                      <p>{repo.description}</p>
                                  </div>
                                  <div className="col-md-6">
                                      <span className="badge badge-info mr-1">
                                          Stars: {repo.stargazers_count}
                                      </span>
                                      <span className="badge badge-secondary mr-1">
                                          Watchers: {repo.watchers_count}
                                      </span>
                                      <span className="badge badge-success">
                                          Forks: {repo.forks_count}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfileGithub;
