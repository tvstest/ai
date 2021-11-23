import { QuestionAttemptType } from 'utilities/enum/question-attempt-type'
import { QuestionType } from 'utilities/enum/question-type'
import { IAnswerOption } from './answer-option'

export interface IQuestionAnswerDetail {
  id: number
  questionType: QuestionType
  correctAnswer: string | number[]
  userAnswer?: string | number[]
  isCorrectAnswer?: boolean
  question: string
  answerOptions: IAnswerOption[]
  status: QuestionAttemptType
}
