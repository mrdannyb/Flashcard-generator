var inquirer = require("inquirer");
var fs = require("fs");

var stack = "example";
var practiceStack = [];


function firstPrompt() {
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
        newCard(answer.newOrAdd);
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
      fs.appendFile(stack + ".txt", stack, function(err){
        if (err) throw err;
        console.log("Made the stack called: " + stack);
        newCard(answer.stackCalled);
      })
    })
}

function newCard(title) {
  inquirer.
    prompt([
      {
        name: "ready",
        type: "confirm",
        message: "Shall we add a new card to stack " + title
      }
    ]).then(function(answer) {
      if (answer.ready) {
        addToStack(title);
      } else {
        firstPrompt();
      }
    })
  console.log("at newCard(), stack is " + stack)
  console.log("the param in newCard() is: " + title);
}

function addToStack(title) {
  console.log("gonna add to stack " + title + " if it exists");
  inquirer.
    prompt([
      {
        name: "question",
        message: "Type your question. If you want the answer to represent a missing word, put a # where the word would be.",
        type: "input"
      },
      {
        name: "response",
        message: "Type your answer here.",
        type: "input"
      }
    ]).then(function(ans) {
      var nCard = new card(ans.question, ans.response);
      fs.appendFile(title + ".txt", nCard.quest + "&$" + nCard.answer + "!@#", function(err) {
        if (err) throw err;
        console.log("card added to the stack " + stack);
        console.log("arg for then in add to stack: " + title);
        newCard(title);
      })
    })
}

var card = function(arg1, arg2) {
  this.quest = arg1;
  this.answer = arg2;
}

function pracStack(title) {
  console.log("practicing the stack called: " + title);
  fs.readFile(title + ".txt", "utf8", function(err, data) {
    if (err) throw err;
    var dataArr = data.split("!@#");
    for (i = 0; i < (dataArr.length - 1); i++) {
      var popIn = dataArr[i].split("&$");
      var qna = new card(popIn[0],popIn[1]);
      console.log(qna);
      practiceStack.push(qna);
      console.log(i + " :pracstack = " + practiceStack)
    }
  })
}

firstPrompt();
