import { Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  CopyOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React from "react";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };

  const getMenuLinkClass = (path) => {
    return `menu-link flex flex-col items-center transition-all ${
      pathname === path ? "text-[#40a9ff]" : "hover:text-[#40a9ff]"
    }`;
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo flex items-center">
          <ShoppingCartOutlined className="text-3xl mr-2 text-amber-500" />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-amber-500">CİCİ</span>
            <span className="text-2xl font-bold text-blue-500">bakkal</span>
          </div>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün Arama"
            style={{ borderRadius: "16px" }}
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-8 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link to="/" className={getMenuLinkClass("/")}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} size="medium">
            <Link to="/shoppingcart" className={getMenuLinkClass("/shoppingcart")}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link to="/bills" className={getMenuLinkClass("/bills")}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link to="/customers" className={getMenuLinkClass("/customers")}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link to="/chart" className={getMenuLinkClass("/chart")}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <div onClick={logOut} className="menu-link flex flex-col items-center hover:text-[#40a9ff] transition-all cursor-pointer">
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Çıkış</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
