import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { deleteProduct } from '../../redux/features/auth/admin/products/deleteProducts'
import { doCreateProduct } from '../../redux/features/auth/admin/products/createProduct'
import { fetchProducts } from '../../redux/features/products/productsList'
import Paginate from '../../components/Paginate'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { keyword, pageNumber } = useParams()

  const { products, isLoading, isError, message, page, pages } = useSelector(
    (state) => state.products)

  const {
    isLoading: productDeleteLoading,
    isError: productDeleteError,
    isSuccess: productDeleteSuccess,
    message: productDeleteMessage
  } = useSelector(
    (state) => state.handleProducts)

  const {
    createdProduct,
    isLoading: productCreateLoading,
    isError: productCreateError,
    isSuccess: productCreateSuccess,
    message: productCreateMessage
  } = useSelector(
    (state) => state.createProduct)

  const userLogin = useSelector(state => state.auth.user)

  useEffect(() => {
    // dispatch(createProductReset())

    if (!userLogin.isAdmin) {
      navigate('/login')
    }

    if (productCreateSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(fetchProducts({
        keyword: '',
        pageNumber: pageNumber || 0
      }))
    }

  }, [userLogin, productCreateSuccess, productDeleteSuccess,
    createdProduct._id, pageNumber, dispatch, navigate])

  const deleteHandler = (productId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(productId))
    }
  }

  const createProductHandler = () => {
    dispatch(doCreateProduct())
  }

  if (productDeleteSuccess) {
    // toast.success('Product Deleted')
  }

  // if (productDeleteError) {
  //   setTimeout(() => {
  //     dispatch(reset())
  //   }, 3000)
  // }

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>
      {productDeleteLoading && <Spinner />}
      {productDeleteError && <Alert variant='danger'>{productDeleteMessage}</Alert>}
      {productCreateLoading && <Spinner />}
      {productCreateError && <Alert variant='danger'>{productCreateMessage}</Alert>}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Alert variant='danger'>{message}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='outline-dark' className='btn-sm m-2'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm m-2'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            isAdmin={true}
          />
        </>
      )}
    </Container>
  )
}

export default ProductList