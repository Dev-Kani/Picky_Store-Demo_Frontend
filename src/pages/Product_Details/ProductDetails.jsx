import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Card, Button, Container, Form } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
import Rating from '../../components/Rating/Rating'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import { addToCart } from "../../redux/features/cart/cartSlice"
import { getProductDetails } from "../../redux/features/products/productDetails"
import { doCreateReview, productReviewReset } from "../../redux/features/products/createReview"
// import Meta from "../../components/Meta"


const SingleProduct = () => {
  const dispatch = useDispatch()

  const { productId } = useParams()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const userLogin = useSelector(state => state.auth.user)
  const { product, isLoading, isError, message } = useSelector(
    state => state.productDetails)

  const {
    isLoading: reviewLoading,
    isSuccess: reviewSuccess,
    isError: reviewError,
    message: reviewMessage
  } = useSelector(state => state.productReview)

  useEffect(() => {
    if (reviewSuccess) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch(productReviewReset())
    }
    dispatch(getProductDetails(productId))
  }, [reviewSuccess, productId, dispatch])

  const addToCartHandler = () => {
    dispatch(addToCart({ product, qty, totalItemPrice: qty * product.price }))
    // navigate(`/cart/${productId}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      doCreateReview({
        productId,
        rating: Number(rating),
        comment,
      })
    )
  }

  return (
    <Container>
      <Link className='btn  btn-block btn__dark mt-3' to='/'>Go Back</Link>
      {isLoading ? <Spinner /> : isError ? <Alert variant='danger'>{message}</Alert> : (
        <>
          {/* <Meta title={product && product.name} /> */}
          <Row>
            <Col md={6}>
              <Image src={product && product.image} alt={product && product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product && product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product && product.rating}
                    text={`${product && product.numReviews}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product && product.price}</ListGroup.Item>
                <ListGroup.Item>{product && product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product && (product.price * qty).toFixed(2)}{` (${qty})`}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product && product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={() => addToCartHandler(product)}
                      className='btn btn-block  btn__dark btn__yellow'
                      type='button'
                      disabled={product && product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4 className="mt-3">Reviews</h4>
              {product?.reviews.length === 0 && <Alert variant='info'>No reviews</Alert>}
              <ListGroup variant='flush'>
                {product?.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>Write a Customer Review</h5>
                  {reviewError &&
                    <Alert variant='danger'>{reviewMessage}</Alert>
                  }
                  {userLogin?.name ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>-- Choose --</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className="mt-3">Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' className="btn__dark mt-3">Submit</Button>
                    </Form>
                  ) : (
                    <Alert variant='secondary'>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Alert>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default SingleProduct