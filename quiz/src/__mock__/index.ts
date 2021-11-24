import { Language } from 'utilities/enum/language'
import { QuestionType } from 'utilities/enum/question-type'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'

export const questionsData: IQuestionDetail[] = [
  {
    id: 1,
    questionType: QuestionType.SingleSelect,
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
    id: 3,
    questionType: QuestionType.CorrectIncorrect,
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
  {
    id: 4,
    questionType: QuestionType.FillInTheBlanks,
    languages: [
      {
        language: Language.English,
        question: 'Where Does the Sun Rise?',
        answerOptions: [],
      },
      {
        language: Language.Hindi,
        question: 'Where Does the Sun Rise?',
        answerOptions: [],
      },
    ],
    correctAnswer: 'EAST',
  },
]

export const state = {
  questionAnswers: [
    {
      id: 1,
      questionType: 0,
      correctAnswer: [1],
      status: 0,
      question: '1 + 1 = ?',
      answerOptions: [
        { description: '2', id: 1 },
        { description: '3', id: 2 },
        { description: '4', id: 3 },
        { description: '5', id: 4 },
      ],
      userAnswer: [1],
    },
    {
      id: 2,
      questionType: 4,
      correctAnswer: [1, 3],
      status: 0,
      question: 'Choose country which starts from I.',
      answerOptions: [
        { description: 'India', id: 1 },
        { description: 'Pakistan', id: 2 },
        { description: 'Indonesia', id: 3 },
        { description: 'Srilanka', id: 4 },
      ],
      userAnswer: [1, 3],
    },
    {
      id: 3,
      questionType: 1,
      correctAnswer: '[1]',
      status: 0,
      question: 'The Sun rises in the East. Is this true or false? ',
      answerOptions: [
        {
          id: 1,
          description: 'True',
        },
        {
          id: 2,
          description: 'False',
        },
      ],
      userAnswer: [1],
    },
    {
      id: 4,
      questionType: 2,
      correctAnswer: 'EAST',
      status: 0,
      question: 'Where Does the Sun Rise?',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      answerOptions: [] as any,
      userAnswer: 'east',
    },
  ],
}
