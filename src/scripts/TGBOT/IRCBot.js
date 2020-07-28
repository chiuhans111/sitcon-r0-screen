import TelegramBot from "./TelegramBot";

class IRCBot extends TelegramBot {
  constructor(token) {
    super(token);

    this.messages = [];
    this.maxMessages = 25;
  }
  receiveMessage(message) {
    this.messages.push(message);
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(
        this.messages.length - this.maxMessages
      );
    }
  }
}

export default IRCBot;
