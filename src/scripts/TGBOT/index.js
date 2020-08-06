import IRCBot from "./IRCBot";
import ControlBot from "./ControlBot";
import config from "../../../config.js";

let ircBot, controlBot, destroy;

function updateBot(bot, interval) {
  let update = function() {
    // console.log(ircBot.messages);
    if (bot.alive) {
      bot.update();
      bot.getUpdate(interval).then(
        function() {
          setTimeout(update, 500);
        },
        function(err) {
          console.log("got error,", err);
          setTimeout(update, 500);
        }
      );
    }
  };

  let updateLoop = function() {
    // console.log(ircBot.messages);
    if (bot.alive) {
      bot.update();
      setTimeout(updateLoop, 1000);
    }
  };

  function start() {
    update();
    updateLoop();
  }

  return start;
}

function TGBOT() {
  if (ircBot == undefined) {
    console.log("creating bots");
    ircBot = new IRCBot(config.bots.IRC.token);
    controlBot = new ControlBot(config.bots.Control.token);

    ircBot.ready = updateBot(ircBot);
    controlBot.ready = updateBot(controlBot);

    destroy = function() {
      console.log("bot prepare to be destroyed!");
      ircBot.destroy();
      controlBot.destroy();
      ircBot = null;
      controlBot = null;
      // console.log("ircBot alive", ircBot.alive);
      // console.log("controlBot alive", controlBot.alive);
    };
  }
  return { ircBot, controlBot, destroy };
}

export default TGBOT;
