import IRCBot from "./IRCBot";
import ControlBot from "./ControlBot";
import config from "../../../config.js";

var ircBot = new IRCBot(config.bots.IRC.token);
var controlBot = new ControlBot(config.bots.Control.token);

var ircTimeout = null;
var controlTimeout = null;

ircBot.ready = updateIRC;

function updateIRC() {
  clearTimeout(ircTimeout);
  // console.log(ircBot.messages);
  ircBot.getUpdate().then(function() {
    ircTimeout = setTimeout(updateIRC, 50);
  });
}

controlBot.ready = updateControl;
function updateControl() {
  clearTimeout(controlTimeout);
  // console.log(controlBot.messages);
  controlBot.getUpdate().then(function() {
    controlTimeout = setTimeout(updateControl, 50);
  });
}

export default {
  ircBot,
  controlBot,
};
