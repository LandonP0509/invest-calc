import { useState } from "react";
import Header from "./components/Header";
import InvestForm from "./components/InvestForm";
import Results from "./components/Results";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <>
      <Header />
      <InvestForm onCalculate={calculateHandler} />

      {!userInput && <p style={{textAlign: 'center'}}>No investment Calculated yet.</p>}
      {userInput && (
        <Results
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </>
  );
}

export default App;
