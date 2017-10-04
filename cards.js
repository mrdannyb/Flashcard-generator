var inquirer = require("inquirer");
var args = process.argv;



inquirer.
  prompt([
  {
    name: "practiceOrMake",
    type: "list",
    message: "Would you like to [CREATE] some cards or [PRACTICE] with what you have?",
    choices: ["CREATE", "PRACTICE"]
  }
]).then(function(answer) {
  if (answer.practiceOrMake.toUpperCase() === "CREATE") {
    create();
  } else if (answer.practiceOrMake.toUpperCase() === "PRACTICE") {
    practice();
  } else {
    console.log("\nActually, I only know how to do two things: CREATE or PRACTICE. \nI'm flattered that you would consider me a more interesting program");
  }
})

function create() {
  inquirer.
    prompt([
      {
        name: "newOrAdd",
        type: "input",
        message: "Type in the name of the card stack you want to add to, or type [NEW] if you want to start a new one"
      }
    ]).then(function(answer) {
      if (answer.newOrAdd.toUpperCase() === "NEW") {
        newStack();
      } else {
        addToStack(answer.newOrAdd);
      }
    })
}

function newStack() {
  console.log("new stack about to start");
}

function addToStack(title) {
  console.log("gonna add to stack " + title + " if it exists");
}

function practice() {
  console.log("practice!!");
}
