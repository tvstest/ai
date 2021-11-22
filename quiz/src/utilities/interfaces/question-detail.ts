import { QuestionType } from '../enum/question-type'
import { IQuestionLanguageDetail } from './question-languages-detail'

export interface IQuestionDetail {
  id: number
  questionType: QuestionType
  languages: IQuestionLanguageDetail[]
  correctAnswer: string | number[]
  userAnswer?: string | number[]
}
