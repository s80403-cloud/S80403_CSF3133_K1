// Error 1 (grade.html, Line 9): Missing "return" in onsubmit="return checkMark()", causing page reload.
// Error 2 (grade.html, Line 17): Wrong function casing onclick="showtable()" instead of "showTable()".
// Error 3 (grade.html, Line 19): Wrong script filename "grades.js" instead of "grade.js".
// Error 4 (grade.js, Lines 2-3): Missing "=" assignment operators and mismatched bracket ["mark").
// Error 5 (grade.js, Line 4): Used assignment "=" instead of comparison "===" in if (name === "").
// Error 6 (grade.js, Line 8): Misspelled isNan() instead of isNaN().
// Error 7 (grade.js, Line 13): Used "&&" instead of "||" in range check (mark < 0 || mark > 100).
// Error 8 (grade.js, Line 23): Missing closing parenthesis ")" in else if (mark >= 50).
// Error 9 (grade.js, Line 26): Missing "=" in grade = "F";.
// Error 10 (grade.js, Lines 28-30): Used getElementByID, missing quotes around " got grade ", and British spelling style.colour.
// Error 11 (grade.js, Line 31): Returned true instead of false, causing form submission to refresh the page.
// Error 12 (grade.js, Lines 38-42): Loop started at i = 1 (skipping grade A), placed "</table>" inside loop, and used innerHtml instead of innerHTML.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2: Validate empty mark field
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = Number(mark);

    // Validate mark range (0-100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and set result text color
    let grade;
    let resultEl = document.getElementById("result");

    if (mark >= 80) {
        grade = "A";
        resultEl.style.color = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultEl.style.color = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultEl.style.color = "orange";
    } else {
        grade = "F";
        resultEl.style.color = "red";
    }

    // Display grade result
    resultEl.innerHTML = name + " got grade " + grade;

    // Part 2: Display date and time checked in matching color
    let timeEl = document.getElementById("checkedTime");
    timeEl.style.color = resultEl.style.color;
    timeEl.innerHTML = "Checked on: " + new Date();

    // Prevent form submission reload so result stays visible
    return false;
}

// Part 2: Generate a random integer from 0 to 100 and fill the mark input
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Display all 4 grades in a formatted HTML table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}