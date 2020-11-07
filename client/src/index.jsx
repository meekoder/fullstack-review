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
    this.setter = this.setter.bind(this);
  }

  componentDidMount() {
    this.get25();
  }

  get25() {
    console.log('ok')
    const fn = this.setter;
    axios.get('/repos')
      .then(res => fn({repos: res.data}))
      .catch(e => console.log(e));
  }

  setter(obj) {
    this.setState(obj);
    console.log(this.state)
  }

  search(term) {
    console.log(`${term} was searched`);
    const fn = this.get25;
    axios.post('/repos', {username: term})
      .then((res) => {
        fn();
        this.forceUpdate();
      })
      .catch(e => console.log(e));
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search} />
      <RepoList repos={this.state.repos} refresher={this.get25}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
