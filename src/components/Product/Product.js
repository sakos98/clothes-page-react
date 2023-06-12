import styles from './Product.module.scss';
import ProductForm from './ProductForm/ProductForm';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';


const Product = ({  name, title, basePrice, colors, sizes }) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);


  const getPrice = useMemo(() => {
    const foundSize = sizes.find((size) => size.name === currentSize);
    return basePrice + foundSize.additionalPrice;
  }, [basePrice, currentSize, sizes]);

  const addToCart = (e) => {
    e.preventDefault();
    console.log('Summary');
    console.log('============');
    console.log('Name: ', title);
    console.log('Price: ', getPrice());
    console.log('Size: ', currentSize);
    console.log('Color: ', currentColor);
  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.image}
          alt={`${title} - ${currentColor} - ${currentSize}`}
          size={currentSize}
          // src={`${process.env.PUBLIC_URL}/images/products/shirt-kodilla--${currentColor}.jpg`}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`}  
          />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice}$</span>
        </header>
        <ProductForm
          sizes={sizes}
          colors={colors}
          currentSize={currentSize}
          currentColor={currentColor}
          setCurrentSize={setCurrentSize}
          setCurrentColor={setCurrentColor}
          addToCart={addToCart}
        />
      </div>
    </article>
  )
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      additionalPrice: PropTypes.number,
    })
  ).isRequired,
};

export default Product;