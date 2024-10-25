import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../components/cards/ProductCard";
import { getFavourite, addToFavourite } from "../api"; // Make sure addFavourite is defined in your API
import { CircularProgress, Button } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Favourite = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    const res = await getFavourite(token);
    setProducts(res.data);
    setLoading(false);
  };

  const handleAddToFavourite = async (productId) => {
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, productId); // Ensure this API is correctly defined
    getProducts(); // Refresh the favorites list
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Your favourites</Title>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.length === 0 ? (
                <>No Products</>
              ) : (
                products.map((product) => (
                  <ProductCard
                    key={product.id} // Add a key prop for unique identification
                    product={product}
                    onAddFavourite={() => handleAddToFavourite(product.id)} // Pass the function to handle adding
                  />
                ))
              )}
            </>
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Favourite;
