import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();
  const [age, setAge] = useState("");
  const [isMarried, setIsMarried] = useState(false);
  const [income, setIncome] = useState("");
  const [result, setResult] = useState("");
  const [loanData, setLoanData] = useState<null | {
    years: number;
    loan: number;
    installment: number;
    rate: number;
  }>(null);
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = t("title");
  }, [isArabic, t]);

  useEffect(() => {
    if (loanData) {
      const { years, loan, installment, rate } = loanData;
      const key = rate === 3 ? "loan_3_result" : "loan_8_result";
      setResult(
        t(key, {
          years,
          loan: loan.toLocaleString(),
          installment: installment.toFixed(0),
        })
      );
    }
  }, [i18n.language, loanData, t]);

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
      setLoanData({
        years,
        loan: maxLoan,
        installment: monthlyInstallment,
        rate: 3,
      });
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
      setLoanData({
        years,
        loan: maxLoan,
        installment: monthlyInstallment,
        rate: 8,
      });
      return;
    }

    setLoanData(null);
    setResult(t("not_eligible"));

    if (window.gtag) {
      window.gtag("event", "calculate_loan_clicked", {
        event_category: "engagement",
        event_label: "Calculate Loan Button",
        marital_status: isMarried ? "Married" : "Single",
        income: Number(income),
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="lang-switcher">
        <button
          onClick={() => i18n.changeLanguage("ar")}
          className={i18n.language === "ar" ? "active-lang" : ""}
          disabled={i18n.language === "ar"}
        >
          العربية
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={i18n.language === "en" ? "active-lang" : ""}
          disabled={i18n.language === "en"}
        >
          English
        </button>
      </div>
      <div className="container">
        <h1 className="title">{t("title")}</h1>

        <div className="form-group">
          <label>{t("age")}:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>{t("marital_status")}:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="marital"
                checked={!isMarried}
                onChange={() => setIsMarried(false)}
              />
              {t("single")}
            </label>
            <label>
              <input
                type="radio"
                name="marital"
                checked={isMarried}
                onChange={() => setIsMarried(true)}
              />
              {t("married")}
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>{t("income")}:</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="input"
          />
        </div>

        <div className="button-group single-button">
          <button onClick={calculateLoan} className="btn primary large">
            {t("calculate")}
          </button>
        </div>

        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
}

export default App;
