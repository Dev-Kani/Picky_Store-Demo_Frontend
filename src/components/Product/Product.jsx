import { useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../../components/Rating/Rating'
import { addToCart } from '../../redux/features/cart/cartSlice'
import './Product.css'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(addToCart({ product, qty: 1, totalItemPrice: product.price }))
  }

  return (
    <Card className='mb-4 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body className='pb-0'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Rating
              value={product.rating}
              text={`${product.numReviews}`}
            />
          </div>
        </Card.Text>

        <div className='card__bottom'>
          <div>
            <Card.Text className='card__bottom-price'>${product.price}</Card.Text>
          </div>
          <div>
            <button
              disabled={product && product.countInStock === 0}
              onClick={addToCartHandler}
              className='card__bottom-btn'
            ><i className="fa fa-cart-plus card__bottom-icon" aria-hidden="true" /></button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product