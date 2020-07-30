import TelegramBot from "./TelegramBot";
import time from "../Format/time";
import config from "../../../config";

class IRCBot extends TelegramBot {
  constructor(token) {
    super(token);
    this.globalstate = {
      messages: [],
    };

    this.maxMessages = 25;
    this.ignoreConfirmed = false;
    this.lastTime = "";
  }
  receiveMessage(message) {
    if (message.chat.id !== config.bots.IRC.chat_id) return;
    this.ignoreConfirmed = true;
    let t = time.hhmm(message.date * 1000);
    if (this.lastTime != t) {
      message.t = t;
      this.lastTime = t;
    }
    console.log(message);

    this.globalstate.messages.push(message);
    if (this.globalstate.messages.length > this.maxMessages) {
      this.globalstate.messages = this.globalstate.messages.slice(
        this.globalstate.messages.length - this.maxMessages
      );
    }
  }
}

export default IRCBot;
