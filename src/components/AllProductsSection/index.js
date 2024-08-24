import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    category: null,
    isFailure: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, searchInput, category} = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}${
      category ? `&category=${category}` : ''
    }`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isFailure: true, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  onChangeSearchInput = inputValue => {
    this.setState({searchInput: inputValue})
  }

  onChangeCategory = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-failure-view.png"
        alt="failure"
      />
      <h1 style={{color: 'red', margin: '4px'}}>Something Went Wrong</h1>
      <p>We Could Not fetch the products. Please try again later.</p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId, searchInput} = this.state
    console.log(productsList)

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <div className="products-header-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
            onChangeSearchInput={this.onChangeSearchInput}
            searchInput={searchInput}
            getProducts={this.getProducts}
          />
        </div>
        <div className="filter-and-product-container">
          <div className="filters-group-container">
            <h1>Category</h1>
            <FiltersGroup
              categoryOptions={categoryOptions}
              ratingsList={ratingsList}
              onChangeCategory={this.onChangeCategory}
            />
          </div>
          <ul className="products-list">
            {productsList.length === 0 ? (
              <div className="no-products-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                  alt="no products"
                />
                <h1 style={{color: 'red', margin: '4px'}}>No Products Found</h1>
                <p>We Could Not Find Any Products. Try Other Filters.</p>
              </div>
            ) : (
              productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, isFailure} = this.state

    let content

    switch (true) {
      case isLoading:
        content = this.renderLoader()
        break

      case isFailure:
        content = this.renderFailureView()
        break

      default:
        content = this.renderProductsList()
        break
    }

    return <div className="all-products-section">{content}</div>
  }
}

export default AllProductsSection
