import IRCBot from "./IRCBot";
import ControlBot from "./ControlBot";
import config from "../../../config.js";

let ircBot, controlBot, destroy;

let t = 0;
function updateBot(bot, interval) {
  let update = function() {
    t++;
    // console.log(ircBot.messages);
    if (bot.alive) {
      if (t % 10 == 0) bot.update();

      bot.getUpdate().then(function() {
        setTimeout(update, interval);
      });
    }
  };
  return update;
}

function TGBOT() {
  if (ircBot == undefined) {
    console.log("creating bots");
    ircBot = new IRCBot(config.bots.IRC.token);
    controlBot = new ControlBot(config.bots.Control.token);

    ircBot.ready = updateBot(ircBot, 1000);
    controlBot.ready = updateBot(controlBot, 0);

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
