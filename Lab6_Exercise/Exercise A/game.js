// Global game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Validate player name and initialize the game session
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Randomly select rock, paper, or scissors for the computer
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Execute a single round of Rock, Paper, Scissors
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    let resultElement = document.getElementById("result");

    // Determine winner across all 9 combinations
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultElement.style.color = "grey";
        resultElement.innerHTML = "Round " + roundCount + ": It's a Draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultElement.style.color = "green";
        resultElement.innerHTML = "Round " + roundCount + ": You Win!";
    } else {
        outcome = "Lose";
        losses++;
        resultElement.style.color = "red";
        resultElement.innerHTML = "Round " + roundCount + ": You Lose!";
    }

    // Store result in array and update scoreboard
    results.push(outcome);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + outcome + "</td>" +
        "</tr>";
}

// Loop through results array to calculate total rounds and win percentage
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let percentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + results.length + " rounds and won " + percentage + "%.";
}

// Reset all scores, history, and status messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}