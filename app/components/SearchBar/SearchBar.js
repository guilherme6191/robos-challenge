import React, { PropTypes } from 'react';

import Topics from '../helpers/Topics';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(param) {
    this.setState({ param });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.param, event);
  }

  handleTopicChange(topic) {
    this.props.onTopicChange(topic);
    this.setState({
      param: '',
    });
  }

  render() {
    return (<div className="search-button-container">
      <form
        className="form-inline search-form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <select
          defaultValue={this.props.topic}
          name="search-which"
          id="search-which"
          className="form-control"
          onChange={event => this.handleTopicChange(event.target.value)}
        >
          <option value={Topics.beers}>Beers</option>
          <option value={Topics.styles}>Styles</option>
        </select>
        <input
          type="text"
          className="form-control search-input"
          placeholder={`Type the name to search for ${this.props.topic}`}
          value={this.state.param}
          onChange={e => this.handleChange(e.target.value)}
        />
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    </div>);
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onTopicChange: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};


export default SearchBar;
