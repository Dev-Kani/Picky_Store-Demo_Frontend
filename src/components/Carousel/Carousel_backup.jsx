import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Spinner from '../../components/LoadingSpinner/Spinner'
import Alert from '../Alert'
// import { fetchTopProducts } from '../../redux/features/products/topProducts'
import './Carousel.css'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { topProducts, isLoading, isError, message } = useSelector(
    state => state.topProducts)

  useEffect(() => {
    dispatch(fetchTopProducts())
  }, [dispatch])

  return isLoading ? (''
    // <Spinner />
  ) : isError ? (
    <Alert variant='danger'>{message}</Alert>
  ) : (
    <Carousel pause='hover' className='bg-dark carousel'>
      {topProducts?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className='carousel__img-container'>
              <Image src={product.image} alt={product.name} fluid />
            </div>
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel