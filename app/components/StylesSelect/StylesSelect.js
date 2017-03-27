import React, { PropTypes } from 'react';

import Select from 'react-select';

function buildList(data) {
  return data.map(style => ({
    value: style.id,
    label: style.name,
  }));
}

class StylesSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: buildList(this.props.data),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(style) {
    this.props.onSelect(style);
  }

  render() {
    return (
      <div className="style-select-container">
        <Select
          name="form-field-name"
          value={this.props.selectedValue}
          options={this.state.list}
          onChange={this.handleChange}
          className="style-select"
          placeholder="Styles"
        />
      </div>
    );
  }
}

StylesSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.number,
};

StylesSelect.defaultProps = {
  selectedValue: 0,
};

export default StylesSelect;

