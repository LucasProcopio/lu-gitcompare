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
    loadUpdate: false,
    loadDelete: false,
    repositoryInput: "",
    repositories: this.getLocalStorageData()
  };

  addToLocalStorage(repository) {
    if (typeof localStorage.repositories !== "undefined") {
      let repositoryList = JSON.parse(localStorage.repositories);
      let repoExists = false;

      repositoryList.map(item => {
        if (item.full_name === repository.full_name) {
          repoExists = true;
        }
        return null;
      });

      if (repoExists) {
        this.setState({ repositoryError: true });
        return repositoryList;
      }

      const newList = repositoryList.concat(repository);
      localStorage.setItem("repositories", JSON.stringify(newList));
    } else {
      localStorage.setItem("repositories", JSON.stringify([repository]));
    }

    this.setState({ repositoryError: false });
    return JSON.parse(localStorage.repositories);
  }

  getLocalStorageData() {
    return localStorage.repositories
      ? JSON.parse(localStorage.repositories)
      : [];
  }

  async fetchRepository(repo) {
    this.setState({ loadUpdate: true });

    try {
      const { data: repository } = await api.get(`/repos/${repo}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      return repository;
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loadUpdate: false });
    }

    return false;
  }

  updateRepository(id) {
    const list = JSON.parse(localStorage.repositories);
    list.map((item, index) => {
      if (item.id === id)
        this.fetchRepository(item.full_name).then(result => {
          list[index] = result;
          localStorage.setItem("repositories", JSON.stringify(list));
        });
      return null;
    });
  }

  deleteRepository(id) {
    this.setState({ loadDelete: true });

    const list = JSON.parse(localStorage.repositories);
    const newList = list.filter(item => {
      return item.id !== id;
    });

    localStorage.setItem("repositories", JSON.stringify(newList));
    this.setState({ repositories: newList, loadDelete: false });
  }

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const repositoryList = this.addToLocalStorage(repository);

      this.setState({
        repositoryInput: "",
        repositories: repositoryList
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
        <CompareList
          repositories={this.state.repositories}
          update={id => this.updateRepository(id)}
          del={id => this.deleteRepository(id)}
          updateLoading={this.state.loadUpdate}
          deleteLoading={this.state.deleteLoading}
        />
      </Container>
    );
  }
}

export default Main;
