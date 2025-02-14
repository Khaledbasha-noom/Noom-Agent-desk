// Fetches the full content from Google Apps Script
async function fetchGoogleDoc() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbwDNjPu28YAgrZwgFxmHcUyqroh_e-L59KbunhKQd35e6dKaA6l96d84qNffLPTEqC6/exec"; 

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        document.getElementById("content").innerText = data.content; // Display in the app
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("content").innerText = "⚠️ Error loading document.";
    }
}

// Fetches and searches articles dynamically
async function searchArticle() {
    let keyword = document.getElementById("searchInput").value.trim();
    
    if (keyword === "") {
        document.getElementById("results").innerHTML = "😱 Oops! You forgot to type something!";
        document.getElementById("results").style.display = "block";
        return;
    }

    document.getElementById("results").innerHTML = "🔍 Searching for: <b>" + keyword + "</b>...";
    document.getElementById("results").style.display = "block";

    // Call Google Apps Script Web App with the keyword
    const apiUrl = `https://script.google.com/macros/s/AKfycbwDNjPu28YAgrZwgFxmHcUyqroh_e-L59KbunhKQd35e6dKaA6l96d84qNffLPTEqC6/exec?query=${encodeURIComponent(keyword)}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayResults(data.result);
    } catch (error) {
        console.error("Error fetching search results:", error);
        document.getElementById("results").innerHTML = "⚠️ Error fetching results. Try again!";
    }
}

// Displays the search results
function displayResults(result) {
    document.getElementById("results").innerHTML = result ? result : "🙃 No results found! Try another word.";
}

// Call the function when the page loads
window.onload = fetchGoogleDoc;
