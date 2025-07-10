import { APIResponse, expect, test } from '@playwright/test'


import { CredentialDto } from './homeWorkDto/credential-dto'
import { OrderDto } from './homeWorkDto/order-dto'


const loginURL = 'https://backend.tallinn-learning.ee/login/student'
const orderURL = 'https://backend.tallinn-learning.ee/orders'

//Test data
const STATUS_OPEN = 'OPEN'
const TEST_CUSTOMER_NAME = 'VladTesting'
const TEST_CUSTOMER_PHONE = '555544444'

test('student receive token then create an order', async ({ request }) => {
  //Build and send auth request
  const credentialsDto = new CredentialDto('oladapoo', 'whs4s5qbYbfT2n')
  const apiResponse: APIResponse = await request.post(loginURL, {
    data: credentialsDto,
  })

  const jwt = await apiResponse.text()
  console.log(jwt)

  //create order
  const orderDto = new OrderDto(STATUS_OPEN, 0, TEST_CUSTOMER_NAME, TEST_CUSTOMER_PHONE, 'no')
  const apiOrderResponse: APIResponse = await request.post(orderURL, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log(apiOrderResponse.status())
  const orderJsonResponse = await apiOrderResponse.json()
  console.log(orderJsonResponse)

  // some assertions for response body
  expect(orderJsonResponse.id).toBeDefined()
  expect(orderJsonResponse.customerName).toBe(TEST_CUSTOMER_NAME)
  expect(orderJsonResponse.customerPhone).toBe(TEST_CUSTOMER_PHONE)

  // let's get this order if from response
  const orderId = orderJsonResponse.id
  console.log('orderId received:' + orderId)

  // let now find this order by id: Get by id
  const apiGetOrderResponse: APIResponse = await request.get(orderURL + '/' + orderId, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const apiGetOrderJson = await apiGetOrderResponse.json()
  console.log(apiGetOrderJson)
})
