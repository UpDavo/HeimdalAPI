export interface TelegramAPIResponse {
  ok: boolean;
  result: Result;
}

export interface Result {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
  reply_markup: ReplyMarkup;
}

export interface Chat {
  id: number;
  title: string;
  type: string;
}

export interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
}

export interface ReplyMarkup {
  inline_keyboard: Array<InlineKeyboard[]>;
}

export interface InlineKeyboard {
  text: string;
  url: string;
}
