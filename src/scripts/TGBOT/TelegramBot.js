class TelegramBot {
  constructor(token) {
    this.token = token;
    this.midwares = [];

    this.ignoreConfirmed = true;
    this.lastUpdateId = -1;
    this.alive = true;
    this.ready = function() {};

    this.setup();
  }

  async setup() {
    console.log("getMe", await this.request("getMe"));
    this.ready();
    // this.getUpdate();
  }

  async getUpdate() {
    let payload = {};

    if (this.ignoreConfirmed) {
      payload.offset = this.lastUpdateId + 1;
    }

    // console.log(this.lastUpdateId);
    let updates = await this.request("getUpdates", payload);

    if (!updates.ok) {
      console.error("getUpdate failed");
      return;
    }

    // console.log(updates);

    await Promise.all(
      updates.result.map((update) => {
        this.lastUpdateId = update.update_id;
        // console.log("update", update);
        if (update.message) {
          let message = update.message;
          let response = new TelegramBotResponse(this, message.chat.id);
          return this.receiveMessage(update.message, response);
        } else if (update.callback_query) {
          let callback_query = update.callback_query;
          let response = new TelegramBotResponse(
            this,
            callback_query.message.chat.id
          );
          response.answer_callback_id = callback_query.id;
          return this.receiveCallback(update.callback_query, response);
        }
      })
    );
  }

  /**
   * TGBot received message
   * @param {Object} message
   * @param {TelegramBotResponse} response
   */
  async receiveMessage(msg, res) {
    console.log("unhandled message", msg, res);
  }

  /**
   * TGBot received callback
   * @param {Object} message
   * @param {TelegramBotResponse} response
   */
  async receiveCallback(cal, res) {
    console.log("unhandled callback", cal, res);
  }

  /**
   * Request Telegram API
   * @param {string} api
   */
  request(api, payload = {}) {
    let xhr = new XMLHttpRequest();
    let me = this;
    // console.log(payload);
    return new Promise((done) => {
      if (!me.alive) return done();

      xhr.open("post", `https://api.telegram.org/bot${this.token}/${api}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        done(JSON.parse(xhr.response));
      };
      xhr.onerror = function() {
        console.error("request", api, "failed");
      };
      xhr.send(JSON.stringify(payload));
    });
  }

  destroy() {
    this.alive = false;
  }
}

class TelegramBotResponse {
  constructor(bot, chat_id) {
    /**@type {TelegramBot} the targeted bot*/
    this.bot = bot;
    this.chat_id = chat_id;

    this.text = null;
    this.reply_markup = {};

    this.inline_keyboard = null;
    this.keyboard = null;

    this.answer_callback_id = null;

    this.terminate = false;
    this.done = false;
  }

  send() {
    let reply_markup = {};

    if (this.inline_keyboard != null)
      reply_markup.inline_keyboard = this.inline_keyboard;
    if (this.keyboard != null) reply_markup.keyboard = this.keyboard;

    if (this.answer_callback_id) {
      this.bot.request("answerCallbackQuery", {
        callback_query_id: this.answer_callback_id,
      });
    }

    let payload = {
      chat_id: this.chat_id,
      // text: this.text,
      // parse_mode:
      // disable_web_page_preview:
      // disable_notification:
      // reply_to_message_id:
      reply_markup,
    };

    if (this.text) payload.text = this.text;

    return this.bot.request("sendMessage", payload);
  }

  setText(text) {
    this.text = text;
  }

  textln(text) {
    this.text += text + "\n";
  }

  addInlineBtn(text, callback_data) {
    if (this.inline_keyboard == null) this.inline_keyboard = [[]];
    this.inline_keyboard[this.inline_keyboard.length - 1].push(
      new InlineKeyboardButton(text, callback_data)
    );
  }

  addInlineBtnRow() {
    if (this.inline_keyboard == null) this.inline_keyboard = [[]];
    this.inline_keyboard.push([]);
  }

  addBtn(text) {
    if (this.keyboard == null) this.keyboard = [[]];
    this.keyboard[this.keyboard.length - 1].push(new KeyboardButton(text));
  }

  addBtnRow() {
    if (this.keyboard == null) this.keyboard = [[]];
    this.keyboard.push([]);
  }
}

class InlineKeyboardButton {
  constructor(text, callback_data) {
    this.text = text;
    this.callback_data = callback_data;
  }
}

class KeyboardButton {
  constructor(text) {
    this.text = text;
  }
}

export default TelegramBot;
