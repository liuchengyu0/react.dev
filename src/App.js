import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // 首頁
import Test from "./components/Test"; // 風險預測頁面
import Download from "./components/Download"; // 下載頁面
import Header from "./components/Header"; // 導覽列
import Footer from "./components/Footer"; // 頁腳
function App() {
  return (
    <Router>
      <div>
        <Header /> {/* 顯示導航列 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/download" element={<Download />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
