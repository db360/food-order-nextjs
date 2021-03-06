import { useState } from "react";
import axios from 'axios';

import styles from "../../styles/Product.module.css";
import Image from "next/image";

const Product = ({product}) => {

  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([])

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if(checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  console.log(extras)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image priority src={product.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {product.extraOptions.map((option) => (

          <div key={option.id + 1} className={styles.option}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=> handleChange(e, option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          ))}
        </div>
        <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity}/>
            <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

//traemos el producto por los params(id)
export const getServerSideProps = async({ params }) => {
  // console.log(params)
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  // console.log(res.data)
  return {

    props: {
      product: res.data
    }
  }
}

export default Product;
