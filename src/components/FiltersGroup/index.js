import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    onChangeCategory,
    onClickRating,
    onClearFilters,
  } = props

  const handleCategory = categoryId => () => {
    onChangeCategory(categoryId)
  }

  const handleRating = ratingId => () => {
    onClickRating(ratingId)
  }

  const handleFilters = () => {
    onClearFilters()
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
        <li key={each.ratingId} className="rating-item">
          <img
            onClick={handleRating(each.ratingId)}
            src={each.imageUrl}
            alt={`rating ${each.ratingId}`}
            className="rating-icon"
          />
          <p>& up</p>
        </li>
      ))}

      <button
        onClick={handleFilters}
        className="clear-filters-button"
        type="button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
