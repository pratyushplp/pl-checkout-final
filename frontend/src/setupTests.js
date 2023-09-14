// This file will be run before all tests are run
import "@testing-library/jest-dom/extend-expect"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks();