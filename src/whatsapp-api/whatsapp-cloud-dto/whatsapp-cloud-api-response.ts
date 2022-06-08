export interface Welcome {
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
}

export interface Parameter {
  type: string;
  text: string;
}
