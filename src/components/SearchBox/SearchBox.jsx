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
  )
}

export default SearchBox