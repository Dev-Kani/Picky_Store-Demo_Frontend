import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBox.css'

const SearchBox = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className='search_box'>
      <div className=''>
        <input
          type='text'
          className='search_box-input'
          // id='name'
          // name='name'
          value={keyword}
          placeholder='Search Products ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button className='search_box-btn'>Search</button>
    </form>
    // <Form onSubmit={submitHandler} className='d-flex flex-gap-2'>
    //   <Form.Control
    //     type='text'
    //     name='q'
    //     onChange={(e) => setKeyword(e.target.value)}
    //     placeholder='Search Products...'
    //     className='mr-sm-2 ml-sm-5'
    //   ></Form.Control>
    //   <Button type='submit' variant='outline-success' className='p-2'>
    //     Search
    //   </Button>
    // </Form>
  )
}

export default SearchBox