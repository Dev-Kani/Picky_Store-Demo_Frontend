import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import FormContainer from '../../components/FormContainer'
import { getProductDetails } from '../../redux/features/products/productDetails'
import { doEditProduct, editedProductReset } from '../../redux/features/auth/admin/products/editProduct'

const EditProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    price: Number(0),
    image: '',
    brand: '',
    category: '',
    countInStock: Number(0),
    description: ''
  })

  // const [uploading, setUploading] = useState(false)

  const { name, price, image, brand, category, countInStock, description } = formData

  const { product, isLoading, isError, message } = useSelector(
    state => state.productDetails)

  const {
    isLoading: editProductLoading,
    isSuccess: editProductSuccess,
    isError: editProductError,
    message: editProductMessage
  } = useSelector(
    state => state.editProduct)

  useEffect(() => {
    if (editProductSuccess) {
      dispatch(editedProductReset())
      navigate('/admin/products-list')
    } else {
      if (!product.name || product._id !== productId) {
        console.log('this ran')
        dispatch(getProductDetails(productId))
      } else {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description
        })
      }
    }
  }, [editProductSuccess, productId, product, dispatch, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(doEditProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
    // dispatch(editedProductReset())
    navigate('/admin/products-list')
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append('image', file)
  //   setUploading(true)

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }

  //     const { data } = await axios.post('/api/upload', formData, config)

  //     setFormData((prevState) => ({
  //       ...prevState,
  //       image: data
  //     }
  //     ))
  //     setUploading(false)
  //   } catch (error) {
  //     console.error(error)
  //     setUploading(false)
  //   }
  // }

  return (
    <>
      <FormContainer>
        <Link to='/admin/products-list' className='btn btn-light my-3'>
          Go Back
        </Link>
        <h1 className='text-center'>Edit Product</h1>
        {editProductLoading && <Spinner />}
        {/* {editProductSuccess && <Alert variant='success'>Product updated successfully</Alert>} */}
        {editProductError && <Alert variant='danger'>{editProductMessage}</Alert>}
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Alert variant='danger'>{message}</Alert>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='form-group'>
              <label htmlFor="name" className='mb-1'>Product Name :</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="price" className='mb-1'>Product Price :</label>
              <input
                type='number'
                className='form-control'
                id='price'
                name='price'
                value={price}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="image" className='mb-1'>Image Url :</label>
              <input
                type='url'
                className='form-control'
                id='image'
                name='image'
                value={image}
                onChange={onChange}
              />
            </div>
            {/* <div className='form-group'>
              <label htmlFor="image_upload" className='mb-1'>Choose am Image :</label>
              <input
                type='file'
                className='form-control'
                id='image_upload'
                // name='image'
                // value={uploading}
                onChange={uploadFileHandler}
              />
            </div> */}
            <div className='form-group'>
              <label htmlFor="brand" className='mb-1'>Product Brand :</label>
              <input
                type='text'
                className='form-control'
                id='brand'
                name='brand'
                value={brand}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="category" className='mb-1'>Category :</label>
              <select
                id="category"
                value={category}
                onChange={onChange}
                name="category"
              >
                <option value="">-- Choose --</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion_accessories">Fashion & Accessories</option>
                <option value="Health_beauty">Health & Beauty</option>
                <option value="Sporting_goods">Sporting Goods</option>
                <option value="Arts_crafts">Arts & Crafts</option>
                <option value="Bags_luggage">Bags & Luggage</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="countInStock" className='mb-1'>Available product count in stock :</label>
              <input
                type='number'
                className='form-control'
                id='countInStock'
                name='countInStock'
                value={countInStock}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="description" className='mb-1'>Product description :</label>
              <textarea
                type='text'
                id={description}
                name="description"
                value={description}
                rows={4}
                cols={40}
                onChange={onChange}
              />
            </div>
            <div className='d-flex justify-content-center'>
              <Button type='submit' variant='dark' >Update</Button>
            </div>
          </form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProduct