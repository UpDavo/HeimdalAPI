export interface ChatAPIRequestTemplate {
  template: string;
  language: Language;
  namespace: string;
  params: Param[];
  phone: string;
}

export interface Language {
  policy: string;
  code: string;
}

export interface Param {
  type: string;
  parameters: Parameter[];
  index?: string;
  sub_type?: string;
}

export interface Parameter {
  type: string;
  text: string;
}
