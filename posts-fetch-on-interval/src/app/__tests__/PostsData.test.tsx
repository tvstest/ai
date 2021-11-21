import React from 'react'
import { render, queryByAttribute } from '@testing-library/react'
import { setupIntersectionObserverMock } from 'app/utility/testUtilities'
import PostsData from '../components/PostsData/index'

beforeEach(() => {
  setupIntersectionObserverMock()
})

test('renders posts table data', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const dom = render(<PostsData />)
  const table = getById(dom.container, 'detail-table')
  expect(table).toBeDefined()
})
