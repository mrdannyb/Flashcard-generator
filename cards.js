var basic = require("./basicCard.js");
var cloze = require("./cloze.js");
var inquirer = require("inquirer");
var fs = require("fs");

var stack = "example";
var practiceStack = [];
var stackList = [];

if (fs.existsSync("./stacks")) {
  firstPrompt();
} else {
  fs.appendFile("stacks.txt","\n", function(err) {
    if (err) throw err;
    firstPrompt();
  })
}

function firstPrompt() {
  fs.readFile("stacks.txt", "utf8", function(err,data) {
    if (err) throw err;
    var dataArr = data.split("\n");
    console.log(dataArr);
  });

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
}

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
        stack = answer.newOrAdd;
        newCardConfirm(answer.newOrAdd);
      }
    })
}

function practice() {
  inquirer.
    prompt([
      {
          name: "whichStack",
          type: "input",
          message: "Time to work on remembering things. Enter the name of the stack or type [MENU] to restart"
      }
    ]).then(function(answer) {
      if (answer.whichStack.toUpperCase() === "MENU"){
        firstPrompt();
      } else {
        pracStack(answer.whichStack);
      }
    })
  }

function newStack(title) {
  console.log("new stack about to start");
  inquirer.
    prompt([
      {
        name: "stackCalled",
        type: "input",
        message: "What's the title of our new stack?"
      }
    ]).then(function(answer) {
      stack = answer.stackCalled;
      fs.appendFile(stack + ".txt", stack + "\n", function(err){
        if (err) throw err;
        console.log("Made the stack called: " + stack);
        newCardConfirm(answer.stackCalled);
      })
      fs.appendFile("stacks.txt", stack + "\n", function(err) {
        if (err) throw err;
      })
    })
}

function newCardConfirm(title) {
  inquirer.
    prompt([
      {
        name: "ready",
        type: "confirm",
        message: "Shall we add a new card to stack " + title
      },
      {
        name: "basicCloze",
        type: "list",
        message: "Basic card or insertion card?",
        choices: ["Basic", "Cloze"]
      }
    ]).then(function(answer) {
      if (answer.ready) {
        switch (answer.basicCloze) {
          case "Basic":
            addBasicToStack(title);
            break;
          case "Cloze":
            addClozeToStack(title);
            break;
        }
      } else {
        firstPrompt();
      }
    })
  console.log("at newCardConfirm(), stack is " + stack)
  console.log("the param in newCardConfirm() is: " + title);
}

function addBasicToStack(title) {
  console.log("gonna add a basic card to stack " + title + " if it exists");
  inquirer.
    prompt([
      {
        name: "question",
        message: "Type your question.",
        type: "input"
      },
      {
        name: "response",
        message: "Type your answer here.",
        type: "input"
      }
    ]).then(function(ans) {
      var nCard = new basicCard(ans.question, ans.response);
      fs.appendFile(title + ".txt", nCard.quest + "&$" + nCard.answer + "!@#", function(err) {
        if (err) throw err;
        console.log("card added to the stack " + stack);
        console.log("arg for then in add to stack: " + title);
        newCardConfirm(title);
      })
    })
}

function addClozeToStack(title) {
  console.log("gonna add cloze to stack");
}

function randomQ() {
  console.log("stack: " + stack);
  var rand = Math.floor(Math.random() * practiceStack.length);
  inquirer.
    prompt([
      {
        name: "quest",
        type: "input",
        message: practiceStack[rand].quest
      }
    ]).then(function(ans) {
      if (true) {
        if (ans.quest === practiceStack[rand].answer) {
          console.log("Correct, ");
        } else {
          console.log("Not the correct answer.");
          inquirer.
            prompt([
              {
                name: "retry",
                type: "list",
                message: "Care to try again, or something else?",
                choices: ["Guess again", "See answer", "Next Question", "Top menu"]
              }
            ]).then(function(answer) {
              switch (answer.retry) {
                case "Guess again":

                  break;
                case "See answer":

                  break;
                case "Next Question":
                  readyNextQ
                  break;
                case "Top menu":
                  firstPrompt();
                  break;
                default:

              }
            })
        }
      } else {
        console
      }
    })
}

function readyNextQ() {
  console.log("a confirm will be here");
}

function pracStack(title) {
  console.log("practicing the stack called: " + title);
  fs.readFile(title + ".txt", "utf8", function(err, data) {
    if (err) throw err;
    var dataArr = data.split("!@#");
    for (i = 0; i < (dataArr.length - 1); i++) {
      var popIn = dataArr[i].split("&$");
      var qna = new card(popIn[0],popIn[1]);
      practiceStack.push(qna);
    }
    console.log("pracStack");
    randomQ();
  })
}
