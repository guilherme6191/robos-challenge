import React, { PropTypes } from 'react';

import ReactPaginate from 'react-paginate';

function BeersGrid({ data, pageCount, handlePageClick, currentPage, totalCount, actionChange }) {
  const items = data ? data.map(item =>
    <li key={item.id} className="list-group-item col-sm-12">
      <div className="col-sm-12">
        <label htmlFor="name">
          {item.name}
        </label>
      </div>
      <div className="col-sm-12">
        {item.description}
      </div>
      <div className="col-sm-2">
        <label htmlFor="IbuMin">ABV:</label>
        {item.abv}
      </div>
      <div className="col-sm-2">
        <label htmlFor="ibuMax">IBU:</label>
        {item.ibu}
      </div>
      <div className="col-sm-2">
        <label htmlFor="abvMin">Is Organic:</label>
        {item.isOrganic}
      </div>
    </li>) : 'No beers match this search.';
  const pagination = data &&
    <div>
      <label htmlFor="currentPage" className="pagination-info">Active: {currentPage}</label><br />
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={7}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
      />
    </div>;
  return (
    <div className="beers-grid-container">
      <div>
        <label htmlFor="actions">Actions:&nbsp;</label>
        <select value={-1} onChange={actionChange}>
          <option value="-1">&nbsp;</option>
          <option value="0">Only Organic</option>
          <option value="3">Only Non Organic</option>
          <option value="1">Order by IBU</option>
          <option value="2">Order by ABV</option>
        </select>
      </div>
      <div className="total-count-info">
        <span>
          {totalCount} results
        </span>
      </div>
      <ul className="list-group">
        {items}
      </ul>
      {pagination}
    </div>);
}

BeersGrid.propTypes = {
  actionChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  pageCount: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
};

BeersGrid.defaultProps = {
  currentPage: 1,
  data: null,
  pageCount: 0,
  totalCount: 0,
};

export default BeersGrid;
