function searchArticle() {
    let keyword = document.getElementById("searchInput").value.trim();
    
    if (keyword === "") {
        document.getElementById("results").innerHTML = "😱 Oops! You forgot to type something!";
        document.getElementById("results").style.display = "block";
        return;
    }

    document.getElementById("results").innerHTML = "🔍 Searching for: <b>" + keyword + "</b>...";
    document.getElementById("results").style.display = "block";

    // Call Google Apps Script to search
    google.script.run.withSuccessHandler(displayResults).searchArticle(keyword);
}

function displayResults(result) {
    document.getElementById("results").innerHTML = result ? result : "🙃 No results found! Try another word.";
}