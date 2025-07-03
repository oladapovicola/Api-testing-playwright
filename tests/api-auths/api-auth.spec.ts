import { expect, test } from '@playwright/test'
import { LoginDto } from '../homeWorkDto/login-dto'
import { StatusCodes } from 'http-status-codes'

const authURL = 'https://backend.tallinn-learning.ee/login/student'

// GET REQUEST
test('Login to a student with incorrect credentials', async ({ request }) => {
  const loginData = new LoginDto(' string123', 'string123')
  const apiResponse = await request.post(authURL, {
    data: loginData,
  })
  expect.soft(apiResponse.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Login to a student with correct credentials', async ({ request }) => {
  const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.post(authURL, {
    data: loginData,
  })

  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeDefined()
  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect.soft(responseBody).toMatch(jwtRegex)
})

test('Test checks negative scenario when user credentials ae wrong', async ({ request }) => {
  const loginData = LoginDto.createLoginWithINCorrectData()
  const response = await request.post(authURL, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('Response code: ', response.status())
  console.log('Response Body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
