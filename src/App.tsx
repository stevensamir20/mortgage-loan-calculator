import { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [isMarried, setIsMarried] = useState(false);
  const [income, setIncome] = useState("");
  const [result, setResult] = useState("");

  const calculateMonthlyPayment = (
    loanAmount: number,
    annualRate: number,
    years: number
  ) => {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const calculateLoan = () => {
    const userAge = parseInt(age);
    const userIncome = parseFloat(income);
    const monthlyPayable = userIncome * 0.4;

    let maxIncome = isMarried ? 18000 : 13000;

    if (userIncome <= maxIncome && userAge >= 21 && userAge <= 60) {
      const years = Math.min(30, 60 - userAge);
      const estimatedLoan = 1000000;
      const testPayment = calculateMonthlyPayment(estimatedLoan, 3, years);
      let maxLoan = Math.floor((monthlyPayable / testPayment) * estimatedLoan);
      maxLoan = Math.min(maxLoan, 1120000);
      const monthlyInstallment = calculateMonthlyPayment(maxLoan, 3, years);
      setResult(
        `• الحد الأقصى لسعر الوحدة هو 1.4 مليون جنيه\n• يجب أن يكون لديك خبرة عمل لا تقل عن 6 أشهر\n• نوع القرض: 3% لمدة ${years} سنة\n• قيمة القرض التقريبية: ${maxLoan.toLocaleString()} جنيه\n• القسط الشهري: ${monthlyInstallment.toFixed(
          0
        )} جنيه`
      );
      return;
    }

    maxIncome = isMarried ? 50000 : 40000;
    if (userIncome <= maxIncome && userAge >= 23 && userAge <= 60) {
      const years = Math.min(25, 60 - userAge);
      const estimatedLoan = 1000000;
      const testPayment = calculateMonthlyPayment(estimatedLoan, 8, years);
      let maxLoan = Math.floor((monthlyPayable / testPayment) * estimatedLoan);
      maxLoan = Math.min(maxLoan, 2000000);
      const monthlyInstallment = calculateMonthlyPayment(maxLoan, 8, years);
      setResult(
        `• الحد الأقصى لسعر الوحدة هو 2.5 مليون جنيه\n• يجب أن يكون لديك خبرة عمل لا تقل عن 6 أشهر\n• نوع القرض: 8% لمدة ${years} سنة\n• قيمة القرض التقريبية: ${maxLoan.toLocaleString()} جنيه\n• القسط الشهري: ${monthlyInstallment.toFixed(
          0
        )} جنيه`
      );
      return;
    }

    setResult("المستخدم غير مؤهل لأي من أنواع القروض.");
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="title">حاسبة قرض التمويل العقاري</h1>

        <div className="form-group">
          <label>السن:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>الحالة الاجتماعية:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="marital"
                checked={!isMarried}
                onChange={() => setIsMarried(false)}
              />{" "}
              أعزب
            </label>
            <label>
              <input
                type="radio"
                name="marital"
                checked={isMarried}
                onChange={() => setIsMarried(true)}
              />{" "}
              متزوج
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>صافي الدخل الشهري:</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="input"
          />
        </div>

        <div className="button-group single-button">
          <button onClick={calculateLoan} className="btn primary large">
            احسب قيمة التمويل
          </button>
        </div>

        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
}

export default App;
