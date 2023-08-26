# AI Chatbot Documentation

Welcome to the Personal Lines AI Chatbot documentation! This guide will help you understand how to use and interact with our AI-powered chatbot, which is built using React for the frontend. The main reason for building this webapp is to create an interface which helps to extract information from provideed documents.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Using Personal Lines](#using-the-chatbot)
   - [Uploading Documents](#uploading-documents)
   - [Asking Questions about Documents](#asking-questions-about-documents)
4. [React Components](#react-components)
5. [Testing]


## Introduction

The personal lines Chatbot is designed to provide intelligent responses to your questions and assist you in various tasks. In addition to text-based queries, the chatbot allows you to upload documents and ask questions related to the content of those documents.

## Getting Started
To run react we have used Vite. Vite is a modern frontend tooling that aims to provide a faster and leaner development experience for modern web projects. Create a Vite project by running this command in the terminal.
    npm create vite@latest
Once the command starts executing, you will be prompted for a project name. Type the name of your project and click enter.
To use the  Chatbot in your React application, follow these steps:

1. Install the required dependencies:
    npm install
2. Set up the required variable in the environment variable file in .env file
3. Run the application:
  npm run dev

Do note that this project was created using typescript, thus the tsconfig.json file may need to be updated, especially when adding type.

## Using Personal Lines Chatbot
 The steps involved are mentioned below
1. User uploads a pdf and asks questions regarding that pdf. For instance, a user may upload an insurance document and asks for its policy number. 

2. The frontend website calls the backend API to upload the document and transfer the user's prompt. 

3. The user recieves the answer along with citation of where the answer was extracted from. The user can provide feedback regarding the answer as well.

## React Components
**This section is for developers**. The main page for the chatbot is the chat page (chat.tsx). The main components are as follow.
1. Question Input: This component is responsible for taking text inputs from users as questions. The upload functionality is also handled by this component. Note that multiple documents can be uploaded. The main file for this component is QuestionInput.tsx.

2. Example Datapoints: This component consists of all the example datapoints that are predefined. Users can ask questions using these datapoints instead of typing questions. Users can choose either single or multiple data points. Please note that the datapoints may vary according to insurance type, such as personal lines or commercial lines. Furthermore, they may further vary based on whether it's home insurance or auto insurance. Currently, only the datapoints for personal lines are available. The main file for this component is ExampleDatapoints.tsx.

3. Answer: This component is responsible for displaying answers obtained when sending the questions through API calls to the backend. Additionally, note that along with answers, the component also displays feedback and citations. A feedback textbox, along with thumbs up and down icons, is used for providing feedback. Citations are displayed in the analysis panel. The main file for this component is Answer.tsx.

4. APIs: All API calls to the backend are handled in the api.ts file located in the api folder. All API calls should be made through this file. Various TypeScript types are defined for sending and receiving data.

 EXTRA NOTES: Regarding citations, while the frontend portion is complete, the backend portion is not yet implemented. The backend needs to send citation data along with the answers. Citations will be links to the images of document pages from which the answers were extracted. The backend can send multiple citations for the same answers, separated by commas (,). An example of how citations should be sent from the backend is shown below

prompt["citations"] = "www.abc.com, www.xyz.com"


## Testing
For testing purpose we have used jest and testing-library to perform unit tests. Currently we have created test cases for only a few components. The tests can be found in the test folder. Do folow the notes below for testing
1. add in vite.config.ts
  "include": ["src", "Tests"],

2. to fix css import issues
install package identity-obj-proxy
add update jest.config.json to
{
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "setupFilesAfterEnv": [
        "@testing-library/jest-dom/extend-expect"
    ],
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy"
    }

}

3. install jest-fetch-mock to mock api CALLs
command: npm install jest-fetch-mock --dev 