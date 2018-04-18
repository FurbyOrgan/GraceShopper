import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: '' };
  }

  onSearchChanged = ({ target }) => {
    this.setState({ searchValue: target.value });
  };

  onSearchSubmit = event => {
    event.preventDefault();
    this.props.history.push('/search/' + this.state.searchValue);
  };

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
        <Input
          icon="search"
          placeholder="Search..."
          value={this.state.searchValue}
          onChange={this.onSearchChanged}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
