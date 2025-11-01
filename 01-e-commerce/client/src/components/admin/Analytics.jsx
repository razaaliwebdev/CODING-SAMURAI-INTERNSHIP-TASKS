import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import AnalyticsCard from "./AnalyticsCard";
import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/analytics");
        console.log("API Response:", response.data);

        if (response.data.analyticsData) {
          setAnalyticsData((prev) => ({
            ...prev,
            users:
              response.data.analyticsData.users ||
              response.data.analyticsData.totalUsers ||
              0,
            products:
              response.data.analyticsData.products ||
              response.data.analyticsData.totalProducts ||
              0,
            totalSales:
              response.data.analyticsData.totalSales ||
              response.data.analyticsData.sales ||
              0,
            totalRevenue:
              response.data.analyticsData.totalRevenue ||
              response.data.analyticsData.revenue ||
              0,
          }));
        }

        if (
          response.data.dailySalesData &&
          Array.isArray(response.data.dailySalesData)
        ) {
          const formattedData = response.data.dailySalesData.map((item, i) => ({
            name:
              item.name ||
              new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
              }) ||
              `Day ${i + 1}`,
            totalSales: Number(item.totalSales) || 0,
          }));
          setDailySalesData(formattedData);
        } else {
          console.warn("No dailySalesData found, using sample data");
          setDailySalesData([
            { name: "Mon", totalSales: 4000 },
            { name: "Tue", totalSales: 3000 },
            { name: "Wed", totalSales: 5000 },
            { name: "Thu", totalSales: 2780 },
            { name: "Fri", totalSales: 1890 },
            { name: "Sat", totalSales: 2390 },
            { name: "Sun", totalSales: 3490 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // ✅ FIX: added missing formatter for currency values
  const revenueFormatter = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value}`;
  };

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-orange-400 to-orange-500"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-orange-400 to-orange-500"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-orange-400 to-orange-500"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={analyticsData.totalRevenue.toLocaleString()}
          icon={DollarSign}
          color="from-orange-400 to-orange-500"
        />
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Sales Overview
        </h2>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailySalesData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#4b5563"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#d1d5db" }}
              />
              <YAxis
                tickFormatter={revenueFormatter}
                stroke="#4b5563"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#d1d5db" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                  fontSize: "0.875rem",
                  padding: "0.75rem",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  "Total Revenue",
                ]}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  color: "#4b5563",
                  fontSize: "0.875rem",
                  paddingBottom: "1rem",
                }}
              />
              <Line
                type="monotone"
                name="Total Revenue"
                dataKey="totalSales"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#f59e0b",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#d97706",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
