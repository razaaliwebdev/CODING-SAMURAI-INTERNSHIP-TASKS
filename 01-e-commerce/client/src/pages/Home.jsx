import React, { useEffect } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div>
      <Hero />
      <CategorySection />
      <div className="w-full">
        {products?.products?.length ? (
          <FeaturedProducts featuredProducts={products.products} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
