function goBack() {
  window.location.href = "index.html";
}

document.getElementById("solarForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const userType = document.getElementById("userType").value;
      const systemSize = parseFloat(document.getElementById("systemSize").value);
      const area = parseFloat(document.getElementById("area").value);
      const systemType = document.getElementById("systemType").value;
      const panelWatt = parseInt(document.getElementById("panelWatt").value);

      const costTableUSD = {
        residential: { basic: 3, premium: 3.8, battery: 5.5 },
        commercial: { basic: 2.5, premium: 3.3, battery: 5 }
      };

      const usdToInr = 82;
      const costPerWattINR = costTableUSD[userType][systemType] * usdToInr;
      const totalCost = systemSize * 1000 * costPerWattINR;
      const totalPanels = Math.ceil((systemSize * 1000) / panelWatt);
      const neededArea = systemSize * 8;
      const areaSufficient = area >= neededArea;

      let suggestion = "";
      if (systemType === "basic") {
        suggestion = "Use standard solar panels.";
      } else if (systemType === "premium") {
        suggestion = "Use high-efficiency panels to save space.";
      } else if (systemType === "battery") {
        suggestion = "Include battery storage for energy backup.";
      }

      const resultBox = document.getElementById("resultBox");
      resultBox.style.display = "block";
      resultBox.innerHTML = `
        <strong>Estimated Cost:</strong> ₹${totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}<br>
        <strong>Panels Required:</strong> ${totalPanels} × ${panelWatt}W<br>
        <strong>Required Area:</strong> ${neededArea} sq. m<br>
        <strong>Area Check:</strong> ${areaSufficient ? "Area is sufficient" : "Area might be insufficient"}<br><br>
        <strong>System Suggestion:</strong> ${suggestion}
      `;
    });