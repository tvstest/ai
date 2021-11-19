import { Language } from 'utilities/enum/language'
import { QuestionType } from '../enum/question-type'
import { IQuestionOption } from './question-option'

export interface IQuestionDetail {
  question: string
  questionType: QuestionType
  language: Language
  options?: IQuestionOption[]
  correctAnswer: string | number[]
}
