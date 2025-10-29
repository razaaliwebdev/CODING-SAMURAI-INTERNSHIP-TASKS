import { useEffect, useState } from "react";
import Product from "./Product";

import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axiosInstance.get("/products/recommendations");
        setRecommendations(response.data.products);
        setIsLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch recommendations."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <p>Loading recommendations...</p>;
  return (
    <div className="mt-8 w-full">
      <h3 className="text-2xl text-orange-400 font-semibold">
        People also bought
      </h3>
      <div className="grid gird-cols-1 my-6 sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {recommendations.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
