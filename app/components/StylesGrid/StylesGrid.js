import React, { PropTypes } from 'react';

function filterData(data, param) {
  return param ? data.filter(item => item.name.indexOf(param) >= 0) : data;
}

class StylesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: filterData(this.props.data, this.props.param),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: filterData(nextProps.data, nextProps.param),
    });
  }

  render() {
    const items = this.state.list.map(item => (
      <li
        key={item.id}
        className="list-group-item col-sm-12"
      >
        <div className="col-sm-12">
          <label htmlFor="name">
            {item.name}
          </label>
        </div>
        <div className="col-sm-12">
          {item.description}
        </div>
        <div className="col-sm-2">
          <label htmlFor="IbuMin">IbuMin:</label>
          {item.ibuMin}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ibuMax">IbuMax:</label>
          {item.ibuMax}
        </div>
        <div className="col-sm-2">
          <label htmlFor="abvMin">AbvMin:</label>
          {item.abvMin}
        </div>
        <div className="col-sm-2">
          <label htmlFor="abvMax">AbvMax:</label>
          {item.abvMax}
        </div>
      </li>
    ));
    return (
      <ul className="list-group styles-grid-container">
        {items}
      </ul>
    );
  }
}

StylesGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  param: PropTypes.string,
};

StylesGrid.defaultProps = {
  param: '',
};

export default StylesGrid;
