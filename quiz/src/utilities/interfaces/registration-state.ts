import { Language } from 'utilities/enum/language'
import { IQuestionAnswerDetail } from './question-answer-detail'

export interface IRegistrationHistoryState {
  name: string
  language: Language
  questionAnswers?: IQuestionAnswerDetail[]
}
