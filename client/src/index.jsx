import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.get25 = this.get25.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.get25();
  }

  get25() {
    axios.get('/repos')
      .then(res => this.setState({repos: res.data}))
      .catch(e => console.log(e));
  }

  search(term) {
    console.log(`${term} was searched`);
    const fn = this.get25;
    axios.post('/repos', {username: term})
      .then((res) => fn())
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <section className="hero is-dark is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
              GitHub Fetcher
              </h1>
            </div>
          </div>
        </section>
        <Search onSearch={this.search} />
        <RepoList repos={this.state.repos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
