import React from 'react'
import { render, queryByAttribute, act } from '@testing-library/react'
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

test('Get posts api should be called 1 time only', async () => {
  const apiFunc = jest.spyOn(PostFetchServices, 'GetPostsData')
  await act(async () => {
    await render(<PostsData />)
    expect(apiFunc).toBeCalledTimes(1)
  })
})

test('Get posts api should be called 3 times', async () => {
  const apiFunc = jest.spyOn(PostFetchServices, 'GetPostsData')
  await act(async () => {
    await render(<PostsData />)
    await new Promise((r) => setTimeout(r, 21000))
    expect(apiFunc).toBeCalledTimes(3)
  })
}, 40000)
