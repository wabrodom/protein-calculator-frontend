document
  .getElementById("proteinCalculator")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const proteinFactor = parseFloat(
      document.getElementById("proteinFactor").value
    );
    const proteinIntake = Math.round(weight * proteinFactor);

    const resultElement = document.getElementById("result");
    resultElement.innerText =
      "Your recommended protein intake per day is " + proteinIntake + " grams.";
    resultElement.classList.remove("hidden");
  });
