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
  receiveMessage(msg) {
    if (msg.chat.id !== config.bots.IRC.chat_id) return;
    this.ignoreConfirmed = true;
    let t = time.hhmm(msg.date * 1000);
    if (this.lastTime != t) {
      msg.t = t;
      this.lastTime = t;
    }
    console.log(msg);

    this.globalstate.messages.push(msg);
    if (this.globalstate.messages.length > this.maxMessages) {
      this.globalstate.messages = this.globalstate.messages.slice(
        this.globalstate.messages.length - this.maxMessages
      );
    }
  }

  receiveEditedMessage(msg) {
    let editedMessage = this.globalstate.messages.find(
      (x) => x.message_id == msg.message_id
    );
    if (editedMessage) {
      editedMessage.text = msg.text;
    }
  }

  clear() {
    this.globalstate.messages = [];
  }
}

export default IRCBot;
