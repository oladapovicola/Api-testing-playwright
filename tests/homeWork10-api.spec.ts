import { expect, test } from '@playwright/test'
import { riskAssessmentDTO } from './homeWorkDto/riskAssessment-dto'
import { StatusCodes } from 'http-status-codes'

const baseURL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('Case 1 Testing negative decision for users with high risk under the age of 18', async ({
  request,
}) => {
  const requestBody = new riskAssessmentDTO(100, 0, 17, true, 1000, 12)
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status : ', response.status())
  console.log('response body : ', await response.json())
  console.log('response headers : ', response.headers())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskLevel).toBe('Very High Risk')
})

test('Case 2 testing a positive decision with medium risk ', async ({ request }) => {
  const requestBody = new riskAssessmentDTO(20000, 0, 30, true, 500, 6)
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status : ', response.status())
  console.log('response body : ', await response.json())
  console.log('response headers : ', response.headers())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskLevel).toBe('Medium Risk')
})

test('Case 3 testing a positive decision with low risk ', async ({ request }) => {
  const requestBody = new riskAssessmentDTO(20000, 0, 30, true, 500, 12)
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status : ', response.status())
  console.log('response body : ', await response.json())
  console.log('response headers : ', response.headers())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskLevel).toBe('Low Risk')
})
