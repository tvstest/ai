import { Language } from 'utilities/enum/language'
import { QuestionType } from 'utilities/enum/question-type'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'

export const questionsData: IQuestionDetail[] = [
  {
    question: '1 + 1 = ?',
    questionType: QuestionType.MultipleChoice,
    options: [
      { id: 1, description: '2' },
      { id: 2, description: '3' },
      { id: 3, description: '4' },
      { id: 4, description: '5' },
    ],
    language: Language.English,
    correctAnswer: [1],
  },
  {
    question: 'Choose country which starts from I.',
    questionType: QuestionType.MultiSelect,
    options: [
      { id: 1, description: 'India' },
      { id: 2, description: 'Pakistan' },
      { id: 3, description: 'Indonesia' },
      { id: 4, description: 'Srilanka' },
    ],
    language: Language.English,
    correctAnswer: [1, 3],
  },
  {
    question: 'The Sun rises in the East. Is this true or false? ',
    questionType: QuestionType.CorrectIncorrect,
    options: [
      { id: 1, description: 'True' },
      { id: 2, description: 'False' },
    ],
    language: Language.English,
    correctAnswer: [1],
  },
  {
    question: '________ Sun rises in the East. Is this true or false? ',
    questionType: QuestionType.FillInTheBlanks,
    language: Language.English,
    correctAnswer: 'The',
  },
  {
    question: 'Hindi Question: 1 + 1 = ?',
    questionType: QuestionType.MultipleChoice,
    options: [
      { id: 1, description: '2' },
      { id: 2, description: '3' },
      { id: 3, description: '4' },
      { id: 4, description: '5' },
    ],
    language: Language.Hindi,
    correctAnswer: [1],
  },
  {
    question: 'देश चुनें जो I से शुरू होता है।',
    questionType: QuestionType.MultiSelect,
    options: [
      { id: 1, description: 'India' },
      { id: 2, description: 'Pakistan' },
      { id: 3, description: 'Indonesia' },
      { id: 4, description: 'Srilanka' },
    ],
    language: Language.Hindi,
    correctAnswer: [1, 3],
  },
  {
    question: 'सूरज पूरब में उगता है। यह सही है या गलत?',
    questionType: QuestionType.CorrectIncorrect,
    options: [
      { id: 1, description: 'सही' },
      { id: 2, description: 'गलत' },
    ],
    language: Language.Hindi,
    correctAnswer: [1],
  },
  {
    question: 'सूर्य ____ में उगता है। ',
    questionType: QuestionType.CorrectIncorrect,
    language: Language.Hindi,
    correctAnswer: 'पूर्व',
  },
]
