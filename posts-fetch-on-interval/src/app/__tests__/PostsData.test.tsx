import React from 'react'
import { render, queryByAttribute, act, waitFor } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { setupIntersectionObserverMock } from 'app/utility/testUtilities'
import * as PostFetchServices from 'app/services/post-fetch-service'
import PostsData from 'app/components/PostsData/index'
import { TIMER_TEST_SECONDS, TIMER_MOCK_TIMEOUT } from 'app/utility/constants'
import { sleep } from 'app/utility/helper'

beforeEach(() => {
  setupIntersectionObserverMock()
})

test('renders posts table data', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const dom = render(<PostsData />)
  const table = getById(dom.container, 'detail-table')
  expect(table).toBeDefined()
})

test('input elements are rendered properly', async () => {
  const { getByTestId } = render(<PostsData />)
  const inputElement = getByTestId('search')
  expect(inputElement).toBeInTheDocument()
})

test('Get posts api should be called once only on component render', async () => {
  const mockApiFunction = jest.spyOn(PostFetchServices, 'GetPostsData')
  await act(async () => {
    render(<PostsData />)
    await waitFor(async () => {
      expect(mockApiFunction).toHaveBeenCalledTimes(1)
    })
  })
})

test(
  'After TIMER_TEST_SECONDS time interval Get posts api should be called thrice',
  async () => {
    const mockApiFunction = jest.spyOn(PostFetchServices, 'GetPostsData')
    await act(async () => {
      render(<PostsData />)
      await sleep(TIMER_TEST_SECONDS)
      await waitFor(async () => {
        expect(mockApiFunction).toHaveBeenCalledTimes(3)
      })
    })
  },
  TIMER_MOCK_TIMEOUT
)

test('renders PostData correctly', () => {
  const domTree = renderer.create(<PostsData />).toJSON()
  expect(domTree).toMatchSnapshot()
})
