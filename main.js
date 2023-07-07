const url = "https://food-protein-api.onrender.com/api";
const table = document.querySelector("#currentTable");
let goalProtein = 0;

document
  .getElementById("proteinCalculator")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const proteinFactor = parseFloat(
      document.getElementById("proteinFactor").value
    );
    const proteinIntake = Math.round(weight * proteinFactor);
    goalProtein = proteinIntake;

    const resultElement = document.getElementById("result");
    resultElement.innerText =
      "Your recommended protein intake per day is " + proteinIntake + " grams.";
    resultElement.classList.remove("hidden");
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let keys = Object.keys(data);

      // Create table header
      const tableHeader = document.createElement("tr");
      const headers = [
        "Protein Food",
        "Serving Size",
        "Weight (g)",
        "Protein (g)",
        "Amount",
      ];
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
      });
      table.appendChild(tableHeader);

      // Populate table rows with data
      keys.forEach((key) => {
        const rowData = data[key];
        const row = document.createElement("tr");

        const foodCell = document.createElement("td");
        foodCell.textContent = key;
        row.appendChild(foodCell);

        const servingSizeCell = document.createElement("td");
        servingSizeCell.textContent = rowData.size;
        row.appendChild(servingSizeCell);

        const weightCell = document.createElement("td");
        weightCell.textContent = rowData.grams;
        row.appendChild(weightCell);

        const proteinCell = document.createElement("td");
        proteinCell.textContent = rowData.protein;
        row.appendChild(proteinCell);

        const userInput = document.createElement("td");
        const proteinInput = document.createElement("input");
        proteinInput.type = "number";
        userInput.appendChild(proteinInput);
        row.appendChild(userInput);

        table.appendChild(row);

        const loading = document.querySelector("#loadingSign");
        loading.classList.add("hidden");
      });
    })
    .catch((error) => {
      console.error("Got error", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculateButton");
  const sumResult = document.getElementById("sumResult");

  calculateButton.addEventListener("click", () => {
    const rows = document.querySelectorAll("#currentTable tr");
    let sum = 0;
    let message = "The Protein intake is ";

    for (let i = 1; i < rows.length; i++) {
      const proteinCell = rows[i].querySelector("td:nth-child(4)");
      const proteinAmountInput = rows[i].querySelector('input[type="number"]');

      const protein = parseFloat(proteinCell.textContent);
      const amount = parseFloat(proteinAmountInput.value);

      if (!isNaN(protein) && !isNaN(amount)) {
        sum += protein * amount;
      }
      // higtlight row
      rows[i].classList.toggle("highlight", !isNaN(amount));
    }
    if (sum > goalProtein) {
      sumResult.textContent =
        message +
        sum.toFixed(2) +
        " grams.\n" +
        `It's greater than the goal by ${(sum - goalProtein).toFixed(2)}`;
    } else {
      message = " gram protein is less than recommendation by ";
      sumResult.textContent =
        sum.toFixed(2) +
        message +
        `${(goalProtein - sum).toFixed(2)}` +
        " grams";
    }
  });
});

function toggleHiddenText() {
  const hiddenText = document.querySelector(".hidden-text");
  const readMore = document.querySelector(".read-more");

  if (hiddenText.style.display === "none") {
    hiddenText.style.display = "inline";
    readMore.textContent = "Less... ";
  } else {
    hiddenText.style.display = "none";
    readMore.textContent = "More...";
  }
}
