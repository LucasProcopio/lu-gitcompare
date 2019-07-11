import React from "react";
import api from "../../services/api";
import moment from "moment";

import logo from "../../assets/logo.png";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

class Main extends React.Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: localStorage.repositories ? JSON.parse(localStorage.repositories) : []
  };

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();


      if (localStorage.repositories !== 'undefined') {
        let repositoryList = JSON.parse(localStorage.repositories);
        const newList = repositoryList.concat(repository);
        localStorage.setItem('repositories', JSON.stringify(newList));

      } else {
        localStorage.setItem('repositories', JSON.stringify([repository]));
      }


      this.setState({
        repositoryInput: "",
        repositories: JSON.parse(localStorage.repositories),
        repositoryError: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Logo" />
        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="User/Repository"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
                "OK"
              )}
          </button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}

export default Main;
