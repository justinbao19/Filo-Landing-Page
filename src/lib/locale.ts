export enum Language {
  EN = 'en',
  ZH_CN = 'zh-CN',
  ZH_TW = 'zh-TW',
  JA = 'ja',
  FR = 'fr',
  IT = 'it',
  DE = 'de',
  ES = 'es',
  PT = 'pt',
  RU = 'ru',
  KO = 'ko',
}

export const LANGUAGE_OPTIONS = [
  { value: Language.EN, label: 'English', nativeLabel: 'English' },
  { value: Language.ZH_CN, label: 'Chinese (Simplified)', nativeLabel: '简体中文' },
  { value: Language.ZH_TW, label: 'Chinese (Traditional)', nativeLabel: '繁體中文' },
  { value: Language.JA, label: 'Japanese', nativeLabel: '日本語' },
  { value: Language.FR, label: 'French', nativeLabel: 'Français' },
  { value: Language.IT, label: 'Italian', nativeLabel: 'Italiano' },
  { value: Language.DE, label: 'German', nativeLabel: 'Deutsch' },
  { value: Language.ES, label: 'Spanish', nativeLabel: 'Español' },
  { value: Language.PT, label: 'Portuguese', nativeLabel: 'Português' },
  { value: Language.RU, label: 'Russian', nativeLabel: 'Русский' },
  { value: Language.KO, label: 'Korean', nativeLabel: '한국어' },
] as const