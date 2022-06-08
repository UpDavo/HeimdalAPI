export interface TelegramAPIRequest {
  chat_id: string;
  text: string;
  parse_mode: string;
  reply_markup: ReplyMarkup;
}

export interface ReplyMarkup {
  inline_keyboard: Array<InlineKeyboard[]>;
}

export interface InlineKeyboard {
  text: string;
  url: string;
}
