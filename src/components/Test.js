import { useState } from "react";

import "./styles.css";

const Modal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <p>有資料未填寫完整，請檢查！</p>
        <button className="modal-button" onClick={onClose}>
          確定
        </button>
      </div>
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    bloodsugar: "",
    cholesterol: "",
    diabetes: "",
    bloodpressure: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [riskVisible, setRiskVisible] = useState(false);
  const [prediction, setprediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = async () => {
    const isValid = Object.values(formData).every((val) => val.trim() !== "");

    if (!isValid) {
      setShowModal(true);
      return; // ❗這裡很重要，防止繼續執行下面的程式碼
    }
    console.log("Sending data:", JSON.stringify(formData));

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          //告訴後端請求的內容類型是 JSON 格式
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), //將前端表單數據 formData 轉換為 JSON 字串，並作為請求的主體發送。
      });

      if (!response.ok) {
        throw new Error("後端回應錯誤");
      }

      const data = await response.json(); // 解析 JSON 格式的回應
      setprediction(data.risk_score.toFixed(2)); // 假設後端回傳的 JSON 格式是 { risk_score: 23.45 }
      setRiskVisible(true); //會顯示風險評估的結果
    } catch (error) {
      console.error("取得風險評估時發生錯誤:", error);
      alert("無法獲取風險評估結果，請稍後再試！");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">輸入您的資訊</h2>
      <div className="form-grid">
        <div>
          <label>性別</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="男"
                onChange={handleInputChange}
              />{" "}
              男
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="女"
                onChange={handleInputChange}
              />{" "}
              女
            </label>
          </div>
        </div>
        <div>
          <label>年齡</label>
          <input
            type="text"
            name="age"
            placeholder="20~70"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>身高 (公分)</label>
          <input
            type="number"
            name="height"
            placeholder="120~210"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>體重 (公斤)</label>
          <input
            type="number"
            name="weight"
            placeholder="40~140"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>空腹血糖 (mg/dl)</label>
          <input
            type="number"
            name="bloodsugar"
            placeholder="70~100"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>總膽固醇 (mg/dl)</label>
          <input
            type="number"
            name="cholesterol"
            placeholder="120~200"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>是否有糖尿病</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="diabetes"
                value="有"
                onChange={handleInputChange}
              />{" "}
              有
            </label>
            <label>
              <input
                type="radio"
                name="diabetes"
                value="無"
                onChange={handleInputChange}
              />{" "}
              無
            </label>
          </div>
        </div>
        <div>
          <label>是否有高血壓</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="bloodpressure"
                value="有"
                onChange={handleInputChange}
              />{" "}
              有
            </label>
            <label>
              <input
                type="radio"
                name="bloodpressure"
                value="無"
                onChange={handleInputChange}
              />{" "}
              無
            </label>
          </div>
        </div>
      </div>
      <button className="submit-button" onClick={validateForm}>
        開始計算
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)} />

      {/* 風險結果區塊 */}
      {riskVisible && (
        <div className="result-section">
          <h2>大腸息肉風險預測結果</h2>
          <p>(此風險試算僅適用於35至70歲，其他年齡層僅供參考！)</p>

          <div className="disease-result">
            <img
              src="https://via.placeholder.com/100"
              alt="健康風險"
              className="disease-image"
            />
            <div className="risk-info">
              <h3>大腸息肉風險</h3>
              <div
                className={`risk-level ${
                  prediction < 10 ? "low" : prediction < 20 ? "medium" : "high"
                }`}
              >
                {prediction < 10
                  ? "低風險"
                  : prediction < 20
                  ? "中風險"
                  : "高風險"}
              </div>
              <p>個人風險: {prediction}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Footer = () => <footer>© 第四組 - 大腸息肉健康風險預測系統</footer>;

export default Form;
