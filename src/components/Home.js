import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <header className="header"></header>

      <div className="hero">
        <div className="hero-overlay">
          <h1>慢性疾病風險評估平台</h1>
          <p>「您知道十年內罹患慢性疾病的風險是可以預測的嗎？」</p>
          <p>準備好健康檢查報告，開始評估吧！</p>
        </div>
      </div>

      <div className="content-section">
        <div className="section">
          <h2>最新消息</h2>
          <ul>
            <li>平台更新版本 1.2 上線</li>
            <li>新增更多健康評估項目</li>
          </ul>
          <a href="#" className="more-button">
            more
          </a>
        </div>
        <div className="section">
          <h2>公告區</h2>
          <ul>
            <li>平台適用年齡為35歲至70歲</li>
            <li>請攜帶完整健康檢查報告</li>
          </ul>
          <a href="#" className="more-button">
            more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
