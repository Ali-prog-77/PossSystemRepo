import React, { useState, useEffect } from "react";
import StatisticCard from "../components/statistic/StatisticCard";
import { Area } from "@ant-design/plots";
import Header from "../components/header/Header";

const Chart = () => {
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/get-all-products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getBills = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/bills/get-all-bills"
        );
        const data = await res.json();
        setBills(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
    getBills();
  }, []);

  // Filter bills to get unique customers
  const uniqueBills = bills.reduce((acc, bill) => {
    const isDuplicate = acc.find(
      (item) =>
        item.customerName === bill.customerName &&
        item.customerPhoneNumber === bill.customerPhoneNumber
    );
    if (!isDuplicate) {
      acc.push(bill);
    } else {
      // Update the existing item
      const index = acc.findIndex(
        (item) =>
          item.customerName === bill.customerName &&
          item.customerPhoneNumber === bill.customerPhoneNumber
      );
      if (index !== -1) {
        acc[index].subTotal += bill.subTotal;
      }
    }
    return acc;
  }, []);

  const areaConfig = {
    data: uniqueBills, // Use uniqueBills here
    xField: "customerName", // Change xField to customerName
    yField: "subTotal",
    xAxis: {
      type: "cat", // Use category axis since we're using names
    },
    areaStyle: () => ({
      fill: "l(270) 0:rgba(24, 144, 255,0.85) 1:rgba(24, 144, 255,0.15)",
    }),
  };

  const totalAmount = () => {
    const amount = bills.reduce((total, item) => item.subTotal + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">admin</span>
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={uniqueBills.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={bills.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products.length}
              img={"images/product.png"}
            />
          </div>
          <div className="charts grid xl:grid-cols-1 md:grid-cols-1 my-10 gap-10 mt-10">
            <div className="area-chart">
              <Area {...areaConfig} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
