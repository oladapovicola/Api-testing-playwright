# Homework 9: API Test Scenarios Checklist

## Test  Table


| Method                         | Description|                                         | Expected Status Code | Status     |
|---------------------------------|---------|-------------------------------------------|----------------------|------------|
|Get order with correct ID        |GET      |Send vaild ID                              | StatusCode .200      | ✅ Passed |
|Get oder with Incorrect ID       |GET      |Send Invailed ID                           | StatusCode .400      |✅ Passed  |
|Post with valid data             | POST     | Send valid order ID                      | StatusCode .200       | ✅ Passed   |
| Post with invalid data          | POST     | Send non-existing order ID               | StatusCode .400       | ✅ Passed   |
| Put with valid data             | PUT     | Send valid ID                             | StatusCodes.200       | ✅ Passed   |
| Put with invalid data           | PUT     | Send non-existing order ID                | StatusCodes.400| ✅ Passed   |
| Delete existing order          | DELETE  | Delete an order with valid ID             | StatusCodes. 200     | ✅ Passed   |
| Delete with invalid ID         | DELETE  | Delete an order with invalid ID           |  StatusCodes.400| ✅ Passed   |
