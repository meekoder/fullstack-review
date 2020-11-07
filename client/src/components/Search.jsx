import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {
    return (
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Enter a GitHub Username" value={this.state.term} onChange={this.onChange} />
        </div>
        <div className="control">
          <a className="button is-info" onClick={() => {this.props.onSearch(this.state.term)}}>
            Add Repos!
          </a>
        </div>
      </div>
    ) 
  }
}

export default Search;
