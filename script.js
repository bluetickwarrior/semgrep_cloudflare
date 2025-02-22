async function runSemgrep() {
    const code = document.getElementById("codeInput").value;
    const rules = document.getElementById("ruleInput").value;

    if (!code.trim()) {
        alert("Please enter some code before running the scan.");
        return;
    }

    document.getElementById("results").innerText = "Running scan...";

    try {
        const response = await fetch("https://hkqi7ors8g.execute-api.us-east-1.amazonaws.com/prod", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code, rules: rules })
        });

        if (!response.ok) {
            throw new Error("Failed to run Semgrep. Check API Gateway setup.");
        }

        const data = await response.json();
        document.getElementById("results").innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        alert("fetch failed");
        document.getElementById("results").innerText = "Error: " + error.message;
    }
}
