import TelegramBot from "./TelegramBot";
import time from "../Format/time";
import config from "../../../config";

class IRCBot extends TelegramBot {
  constructor(token) {
    super(token);
    this.globalstate = {
      messages: [],
    };

    if (localStorage.IRCBot_globalstate) {
      this.globalstate = JSON.parse(localStorage.IRCBot_globalstate);
    }

    this.maxMessages = 25;
    this.ignoreConfirmed = false;
    this.lastTime = "";
  }
  saveState() {
    localStorage.IRCBot_globalstate = JSON.stringify(this.globalstate);
  }
  receiveMessage(msg) {

    if (config.bots.IRC.username && msg.chat.username !== config.bots.IRC.username)
      return;

    this.ignoreConfirmed = true;
    let t = time.hhmm(msg.date * 1000);
    if (this.lastTime != t) {
      msg.t = t;
      this.lastTime = t;
    }
    console.log(msg);
    if (msg.text) {
      this.globalstate.messages.push(msg);
      if (this.globalstate.messages.length > this.maxMessages) {
        this.globalstate.messages = this.globalstate.messages.slice(
          this.globalstate.messages.length - this.maxMessages
        );
      }
    }

    this.saveState();
  }

  receiveEditedMessage(msg) {
    let editedMessage = this.globalstate.messages.find(
      (x) => x.message_id == msg.message_id
    );
    if (editedMessage) {
      editedMessage.text = msg.text;
    }

    this.saveState();
  }

  clear() {
    this.globalstate.messages = [];
    this.saveState();
  }
}

export default IRCBot;
