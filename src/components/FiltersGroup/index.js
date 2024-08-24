import './index.css'

const FiltersGroup = props => {
  const {categoryOptions, ratingsList, onChangeCategory} = props

  const handleCategory = categoryId => () => {
    onChangeCategory(categoryId)
  }

  return (
    <div className="filters-group-container">
      {categoryOptions.map(each => (
        <p
          onClick={handleCategory(each.categoryId)}
          className="filter-category"
          key={each.categoryId}
        >
          {each.name}
        </p>
      ))}
      {ratingsList.map(each => (
        <div key={each.ratingId} className="rating-item">
          <img
            src={each.imageUrl}
            alt={`rating ${each.ratingId}`}
            className="rating-icon"
          />
          <p>& up</p>
        </div>
      ))}

      <button className="clear-filters-button" type="button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
