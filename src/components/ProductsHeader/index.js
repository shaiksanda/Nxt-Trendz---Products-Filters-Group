import {IoSearch} from 'react-icons/io5'

import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const handleInputChange = event => {
    const {onChangeSearchInput} = props
    onChangeSearchInput(event.target.value)
  }

  const handleKeyDown = event => {
    const {searchInput, getProducts} = props
    if (event.key === 'Enter' && searchInput.trim() !== '') {
      getProducts()
    }
  }

  const {sortbyOptions, activeOptionId, searchInput} = props

  return (
    <div className="products-header">
      <div className="input-container">
        <div>
          <input
            type="search"
            placeholder="Search..."
            className="input-element"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <IoSearch />
        </div>
      </div>
      <div>
        <h1 className="products-list-heading">All Products</h1>
      </div>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
