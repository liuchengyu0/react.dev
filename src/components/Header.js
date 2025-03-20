import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <h1>大腸息肉健康風險預測系統</h1>
    <nav>
      <Link to="/">首頁</Link>
      <Link to="/test">風險預測</Link>
      <Link to="/download">下載</Link>
    </nav>
  </header>
);

export default Header;
