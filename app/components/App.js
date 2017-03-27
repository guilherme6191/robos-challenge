import React from 'react';

import BeersGrid from './BeersGrid/BeersGrid';
import Message from './Message/Message';
import SearchBar from './SearchBar/SearchBar';
import StyleSelect from './StylesSelect/StylesSelect';
import StylesGrid from './StylesGrid/StylesGrid';
import Topics from './helpers/Topics';

function buildApiUrl(styleId, param, page, orderBy, isOrganic) {
  return `/beers?styleId=${styleId || ''}&name=${param || ''}&p=${page || ''}&order=${orderBy || ''}&isOrganic=${isOrganic || ''}`;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.doBeerSearch = this.doBeerSearch.bind(this);
    this.onActionChange = this.onActionChange.bind(this);
    this.selectStyle = this.selectStyle.bind(this);

    this.state = {
      beersGridShown: false,
      beersReady: false,
      topic: Topics.beers,
      message: null,
      param: null,
      selectedStyleId: 0,
      stylesReady: false,
      stylesGridShown: false,
    };
  }

  componentDidMount() {
    fetch('/styles', {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          this.setState({ styles: json.data, message: null, stylesReady: true });
        });
      } else {
        this.setState({
          message: { type: 'danger', txt: 'Error retrieving data. Try again later.' },
        });
      }
    });
  }

  onActionChange(event) {
    const action = parseInt(event.target.value, 10);
    if (action === 0) {
      this.setState({ isOrganic: 'Y', orderBy: '', beersReady: false }, () => {
        this.doBeerSearch();
      });
    } else if (action === 1) {
      this.setState({ isOrganic: '', orderBy: 'ibu', beersReady: false }, () => {
        this.doBeerSearch();
      });
    } else if (action === 2) {
      this.setState({ isOrganic: '', orderBy: 'abv', beersReady: false }, () => {
        this.doBeerSearch();
      });
    } else if (action === 3) {
      this.setState({ isOrganic: 'N', orderBy: '', beersReady: false }, () => {
        this.doBeerSearch();
      });
    }
  }

  doBeerSearch(page) {
    fetch(buildApiUrl(this.state.selectedStyleId,
      this.state.param,
      page,
      this.state.orderBy,
      this.state.isOrganic), { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            this.setState({
              data: json.data,
              pageCount: json.numberOfPages || 0,
              beersCount: json.totalResults,
              message: null,
              beersGridShown: true,
              beersReady: true,
            });
          });
        } else {
          const message = response.status === 400 ?
          { type: 'Warning', txt: 'You must pick either a style, type a name or both.' } :
          { type: 'danger', txt: 'Error retrieving data.' };
          this.setState({ message });
        }
      });
  }

  handleSearch(param) {
    if (this.state.topic === Topics.styles) {
      this.setState({ stylesGridShown: true, param });
    } else {
      this.setState({ param, beersReady: false }, () => {
        this.doBeerSearch();
      });
    }
  }

  handlePageClick(page) {
    this.setState({ beersReady: false, currentPage: page.selected + 1 });
    this.doBeerSearch(page.selected + 1);
    window.scrollTo(0, 0);
  }

  handleTopicChange(topic) {
    if (topic !== this.state.topic) {
      this.setState({
        beerGridShown: false,
        topic,
        message: null,
        stylesGridShown: false,
        param: '',
      });
    }
  }

  selectStyle(style) {
    this.setState({ selectedStyleId: style ? style.value : 0 });
  }

  render() {
    const message = this.state.message &&
      <Message {...this.state.message} />;

    const stylesSelect = this.state.topic === 'beers' && this.state.stylesReady ?
      (<StyleSelect
        data={this.state.styles}
        onSelect={this.selectStyle}
        selectedValue={this.state.selectedStyleId}
      />) : this.state.topic === 'beers' && !this.state.stylesReady && <div className="loader" />;

    const stylesGrid = this.state.stylesGridShown &&
      <StylesGrid data={this.state.styles} param={this.state.param} />;

    const beersGrid = this.state.beersGridShown && this.state.beersReady ?
      (<BeersGrid
        actionChange={this.onActionChange}
        currentPage={this.state.currentPage}
        data={this.state.data}
        pageCount={this.state.pageCount}
        handlePageClick={this.handlePageClick}
        totalCount={this.state.beersCount}
      />) : this.state.beersGridShown && !this.state.beersReady && <div className="loader" />;

    return (
      <div className="app container">
        <div className="row">
          <SearchBar
            onSearch={this.handleSearch}
            onTopicChange={this.handleTopicChange}
            topic={this.state.topic}
            styles={this.state.styles}
          />
        </div>
        <div className="row">
          {stylesSelect}
          {message}
        </div>
        <hr />
        {stylesGrid}
        {beersGrid}
      </div>
    );
  }
}

export
default
App;
