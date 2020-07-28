import TelegramBot from "./TelegramBot"

class IRCBot extends TelegramBot {
  constructor(token) {
    super(token)

    this.messages = []
    this.maxMessages = 25
    this.ignoreConfirmed = false
  }
  receiveMessage(message) {
    this.ignoreConfirmed = true
    this.messages.push(message)
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(
        this.messages.length - this.maxMessages
      )
    }
  }
}

export default IRCBot
