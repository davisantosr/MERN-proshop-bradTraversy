import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import PropTypes from 'prop-types'

import Rating from './Rating'



function Product({product}) {
  return (
    <Card className='my-3 p-3 rouded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' ></Card.Img>
      </Link>

      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
      </Link>
      </Card.Body>

      <Card.Text as='div'>
        <Rating 
          value={product.rating} 
          text={`${product.numReviews} reviews`}/>
      </Card.Text>

      <Card.Text as='h3'>${product.price}</Card.Text>

    </Card>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Product
