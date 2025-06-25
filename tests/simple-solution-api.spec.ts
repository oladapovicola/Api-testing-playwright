import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

const baseURL = 'https://backend.tallinn-learning.ee/test-orders'

// GET REQUEST
test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get(baseURL + '/1')
  // Log the apiResponse status, body and headers
  console.log('apiResponse body:', await apiResponse.json())
  console.log('apiResponse headers:', apiResponse.headers())
  // Check if the apiResponse status is 200
  expect(apiResponse.status()).toBe(200)
})

test('request with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get(baseURL + '/211')
  // Log the apiResponse status, body and headers
  console.log('apiResponse body:', await apiResponse.json())
  console.log('apiResponse headers:', apiResponse.headers())
  // Check if the apiResponse status is 200
  expect(apiResponse.status()).toBe(400)
})

// POST REQUEST

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with Incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN1',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  // Log the response status and body... Changes
  console.log('response status:', response.status())
  //console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

//PUT REQUEST

test('PUT order with correct data and API key should receive 200', async ({ request }) => {
  // Define headers with API key
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456', // Replace with your actual key
  }
  // Prepare JSON request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.put(baseURL + '/10', {
    data: requestBody,
    headers: requestHeaders,
  })

  // Log and verify
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

//Put Negative request

test('PUT order with incorrect data and API key should receive 400', async ({ request }) => {
  // Define headers with API key
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456', // Replace with your actual key
  }
  // Prepare JSON request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.put(baseURL + '/18', {
    data: requestBody,
    headers: requestHeaders,
  })

  // Log and verify
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DEL REQUEST

test('Delect order with correct data and API key should receive 204', async ({ request }) => {
  // Define headers with API key
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456', // Replace with your actual key
  }
  // Prepare JSON request body

  const response = await request.delete(baseURL + '/10', {
    headers: requestHeaders,
  })

  // Log and verify
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(204)
})

test('Delect order with Incorrect data and API key should receive 400', async ({ request }) => {
  // Define headers with API key
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456', // Replace with your actual key
  }
  // Prepare JSON request body

  const response = await request.delete(baseURL + '/120', {
    headers: requestHeaders,
  })

  // Log and verify
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(400)
})
