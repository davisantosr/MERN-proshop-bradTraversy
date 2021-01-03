import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


function Product({product}) {
  return (
    <Card className='my-3 p-3 rouded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' ></Card.Img>
      </a>

      <Card.Body>
      <a href={`/product/${product._id}`}>
        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
      </a>
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

export default Product
