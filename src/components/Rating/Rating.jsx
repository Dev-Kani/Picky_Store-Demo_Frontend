import PropTypes from 'prop-types'
import './Rating.css'

const Rating = ({ value, color }) => {
  return (
    <div className='rating'>
      <span className='rating_span'>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span className='rating_span'>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span className='rating_span'>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span className='rating_span'>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span className='rating__span'>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>{` (${value && value}) reviews`}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: 'var(--primary-yellow)',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
}

export default Rating