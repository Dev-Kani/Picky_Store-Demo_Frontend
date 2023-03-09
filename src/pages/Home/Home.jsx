import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row } from "react-bootstrap"
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import { fetchProducts } from "../../redux/features/products/productsList"
import Product from "../../components/Product/Product"
import Paginate from "../../components/Paginate"
import Footer from "../../components/Footer/Footer"
import Carousel from "../../components/Carousel/Carousel"
import './Home.css'
// import Meta from "../../components/Meta"


const Home = () => {
  const dispatch = useDispatch()

  const { keyword, pageNumber } = useParams()

  const { products, isLoading, isError, message, page, pages } = useSelector(
    (state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({
      keyword,
      pageNumber: pageNumber || 1
    }))
  }, [keyword, pageNumber, dispatch])

  return (
    <>
      {/* <Meta /> */}
      <Container>
        {!keyword ? (<Carousel />) :
          (
            <Link to='/' className='btn btn__dark mt-3'>
              Go Back
            </Link>
          )}
        {isLoading ? <Spinner /> : isError ? <Alert variant='danger'>{message}</Alert> :
          <div className="home__page">
            <section>
              <h3 className="my-3">Latest Products</h3>
              <Row>
                {products && products.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </section>
            <div className="pagination">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </div>}
      </Container>
      <Footer />
    </>
  )
}
export default Home