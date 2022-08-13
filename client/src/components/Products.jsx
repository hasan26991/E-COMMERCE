import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilterdProducts] = useState([])

  useEffect(() => {
    const getPoroducts = async () => {
      const res = await axios.get(cat
        ? `http://localhost:5000/api/products?category=${cat}`
        : 'http://localhost:5000/api/products');
      setProducts(res.data);
    }
    getPoroducts();
  }, [cat])

  useEffect(() => {
    cat && setFilterdProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)
      ))
    )
  }, [filters, cat, products])

  useEffect(() => {
    if (sort === 'newest') {
      setFilterdProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    }
    else if (sort === 'asc') {
      setFilterdProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    }
    else if (sort === 'desc') {
      setFilterdProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])


  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      )) : products.slice(0, 8).map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
