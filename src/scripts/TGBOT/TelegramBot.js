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

  update() {}

  async getUpdate() {
    let payload = { timeout: 5 };

    if (this.ignoreConfirmed) {
      payload.offset = this.lastUpdateId + 1;
    }

    // console.log(this.lastUpdateId);
    let updates = await this.request("getUpdates", payload);


    if (!updates.ok) {
      console.error("getUpdate failed");
      return;
    }

    console.log(updates);

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
        } else if(update.edited_message){
          let message = update.edited_message;
          let response = new TelegramBotResponse(this, message.chat.id);
          return this.receiveEditedMessage(message, response);
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
   * TGBot received edited message
   * @param {Object} message
   * @param {TelegramBotResponse} response
   */
  async receiveEditedMessage(msg, res) {
    console.log("unhandled editing", msg, res);
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

    this.last_inline_keyboard_result = null;

    this.reset();

    this.pending = new Promise((done) => done());
  }

  reset() {
    this.text = "";
    this.reply_markup = {};

    this.inline_keyboard = null;
    this.keyboard = null;

    this.answer_callback_id = null;

    this.terminate = false;
    this.done = false;
  }

  send(quick = false) {
    let me = this;
    console.log(this.text);

    if (this.text == null && this.inline_keyboard == null) return;

    let payload = { chat_id: this.chat_id, text: this.text || "SITCON 2020" };

    if (this.keyboard !== null) {
      payload.reply_markup = {
        keyboard: this.keyboard.filter((x) => x.length > 0),
        resize_keyboard: this.keyboard.length < 3,
      };
    }

    if (quick) this.bot.request("sendMessage", payload);
    else
      this.pending = this.pending.then(() =>
        this.bot.request("sendMessage", payload)
      );

    if (this.inline_keyboard !== null) {
      this.pending = this.pending.then(() =>
        this.bot
          .request("sendMessage", {
            chat_id: this.chat_id,
            text: "↓",
            reply_markup: this.getInlineKeyboardReplyMarkup(),
          })
          .then(function(result) {
            me.last_inline_keyboard_result = result;
          })
      );
    }

    if (this.answer_callback_id) {
      this.bot.request("answerCallbackQuery", {
        callback_query_id: this.answer_callback_id,
      });
    }
  }

  editInlineKeyboard() {
    if (this.last_inline_keyboard_result == null) return;
    if (this.inline_keyboard == null) return;
    let chat_id = this.last_inline_keyboard_result.result.chat.id;
    let message_id = this.last_inline_keyboard_result.result.message_id;
    let reply_markup = this.getInlineKeyboardReplyMarkup();
    this.bot.request("editMessageReplyMarkup", {
      chat_id,
      message_id,
      reply_markup,
    });
  }

  getInlineKeyboardReplyMarkup() {
    return {
      inline_keyboard: this.inline_keyboard.filter((x) => x.length > 0),
    };
  }

  setText(text) {
    this.text = text;
  }

  textln(text) {
    if (this.text == null) this.inline_keyboardtext = "";
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
