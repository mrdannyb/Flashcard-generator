var inquirer = require("inquirer");

var card = function(front, back) {
  this.quest = front;
  this.answer = back;
  this.cardPrompt = function() {
    inquirer.
      prompt([
        {
          name: "quest",
          type: "input",
          message: this.quest
        }
      ]).then(function(ans) {
        if (ans.quest === this.answer) {
          console.log("Great, that's right.");
          readyNextQ();
        } else {
          inquirer.
            prompt([
              {
                name: "retry",
                type: "list",
                message: "Care to try again, or something else?",
                choices: ["Guess again", "See answer", "Next Question", "Top menu"]
              }
            ]).then(function(reply) {
              switch (reply.retry) {
                case "Guess again":
                  this.again();
                  break;
                case "See answer":
                  console.log(this.answer);
                  readyNextQ();
                  break;
                case "Next Question":
                  readyNextQ();
                  break;
                case "Top menu":
                  firstPrompt();
                  break;
              }
            })
        }
      })
  }
  this.again = function() {
    this.cardPrompt();
  }
}

module.exports = {
  basicCard: card
};
