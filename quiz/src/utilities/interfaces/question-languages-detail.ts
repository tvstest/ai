import { Language } from 'utilities/enum/language'
import { IAnswerOption } from './answer-option'

export interface IQuestionLanguageDetail {
  language: Language
  question: string
  answerOptions: IAnswerOption[]
}
