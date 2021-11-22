import React from 'react'
import { render, queryByAttribute, act, waitFor } from 'test-utils'
import renderer from 'react-test-renderer'
import { setupIntersectionObserverMock } from 'app/utility/testUtilities'
import * as PostFetchServices from 'app/services/post-fetch-service'
import PostsData from 'app/components/PostsData/index'

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

test('Get posts api should be called 1 time only', async () => {
  const mockApiFunction = jest.spyOn(PostFetchServices, 'GetPostsData')
  await act(async () => {
    render(<PostsData />)
    await waitFor(async () => {
      expect(mockApiFunction).toHaveBeenCalledTimes(1)
    })
  })
})

test('Get posts api should be called 3 times', async () => {
  const mockApiFunction = jest.spyOn(PostFetchServices, 'GetPostsData')
  await act(async () => {
    render(<PostsData />)
    await new Promise((r) => setTimeout(r, 21000))
    await waitFor(async () => {
      expect(mockApiFunction).toHaveBeenCalledTimes(3)
    })
  })
}, 40000)

test('renders PostData correctly', () => {
  const domTree = renderer.create(<PostsData />).toJSON()
  expect(domTree).toMatchSnapshot()
})
