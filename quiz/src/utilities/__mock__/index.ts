import { Language } from 'utilities/enum/language'
import { QuestionType } from 'utilities/enum/question-type'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'

export const questionsData: IQuestionDetail[] = [
  {
    id: 1,
    questionType: QuestionType.MultipleChoice,
    languages: [
      {
        language: Language.English,
        question: '1 + 1 = ?',
        answerOptions: [
          { id: 1, description: '2' },
          { id: 2, description: '3' },
          { id: 3, description: '4' },
          { id: 4, description: '5' },
        ],
      },
      {
        language: Language.Hindi,
        question: 'Hindi Question 1 + 1 = ?',
        answerOptions: [
          { id: 1, description: '2' },
          { id: 2, description: '3' },
          { id: 3, description: '4' },
          { id: 4, description: '5' },
        ],
      },
    ],
    correctAnswer: [1],
  },
  {
    id: 2,
    questionType: QuestionType.MultiSelect,
    languages: [
      {
        language: Language.English,
        question: 'Choose country which starts from I.',
        answerOptions: [
          { id: 1, description: 'India' },
          { id: 2, description: 'Pakistan' },
          { id: 3, description: 'Indonesia' },
          { id: 4, description: 'Srilanka' },
        ],
      },
      {
        language: Language.Hindi,
        question: 'Hindi Question: Choose country which starts from I.',
        answerOptions: [
          { id: 1, description: 'India ()' },
          { id: 2, description: 'Pakistan' },
          { id: 3, description: 'Indonesia' },
          { id: 4, description: 'Srilanka' },
        ],
      },
    ],
    correctAnswer: [1, 3],
  },
  {
    id: 2,
    questionType: QuestionType.MultiSelect,
    languages: [
      {
        language: Language.English,
        question: 'The Sun rises in the East. Is this true or false? ',
        answerOptions: [
          { id: 1, description: 'True' },
          { id: 2, description: 'False' },
        ],
      },
      {
        language: Language.Hindi,
        question:
          'Hindi Question: The Sun rises in the East. Is this true or false? ',
        answerOptions: [
          { id: 1, description: 'True' },
          { id: 2, description: 'False' },
        ],
      },
    ],
    correctAnswer: [1],
  },
]
