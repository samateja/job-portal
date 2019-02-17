# Experteer Full Stack Challenge

Hey there.
This is Experteer’s full stack coding challenge.

Your task is to implement an application where you can search for developer jobs. We will use the Github Jobs API - https://jobs.github.com/api.

We assume that the API is slow and it can take up to 1 minute to give the result. With that in mind, we decide on an application for user to first submit a search query and wait until the results are available as they fetched from the API in the background.

## How to build the project
### Install packages
`npm install`
### Start server
``npm start``

The app will be available on http://localhost:3000/


### Notes
- The design is based on the Bulma CSS framework to make things easier: https://bulma.io/. However, feel free to override styles if needed.


## Requirements
- Use NodeJS, Javascript/jQuery along with SPA framework like AngularJS or ReactJS.
- All API calls to the API are to happen asynchronously (i.e., in background jobs). Use any libraries to achieve this asynchronous functionality.
- The front-end of the application has to be a Single page app.
  - When we refer to a 'page' in the sections below, we mean a page within the Single page app with a routing implementation.
  - Users should be able to navigate between these pages using the browsers' forward and backward functionalities.
- We have prepared the basic structure and functionality for the app.
  - You can start by using the basic functioning back-end from this .zip file.
## Features
### TriggerSearch
- User should be able to visit the homepage of the app and enter a query `text` in a search bar to search for jobs.
- The user should be able to trigger a search according to specific criteria.
- The form is submitted via Javascript.
  - Change the back-end to receive this request and trigger an asynchronous (background job) Job-search.
  - Once the asynchronous Job-search is triggered, the back-end endpoint returns with a message `Request is being processed and results will be available shortly.`
  - The following should happen in the background job:
    - An API call is made to the Github Jobs API.
    - Results are fetched and temporarily stored in a JSON file specific for the search query.
### Polling for results
- Once the TriggerSearch is completed, the front-end starts polling for the search results and a `Loading... Your results will appear here` text and a loading animation (see design) is shown to the user.
- Polling requests are made by javascript.
- Add a separate back-end endpoint that receives these polling requests and checks if the results JSON is available for the search.
  - If the results are not yet available, it returns no results. The front-end reads this and continues polling.
  - If the results are available, it returns the results.
  - Polling times out after 1 minute.
### DisplayResults
- Once the results are returned, the user is presented with a list of jobs that matched their query as a results page.
  - Can be just a single page table with top 10 matches without any pagination.
  - Show the job’s `title, company, description, location, date and type.`
- User can enter new query text in the search field and search for new jobs again.
- If the user navigates back to this results page from other pages, the current search query and results must be preserved, so that the user can continue browsing the results.
### ShowJobDescription
- The user clicks on a job to open the job description page.
- The user can apply to the job from the job description page.
### ApplyToJob
- User can apply to a job by clicking on the Apply button.
- We want to save information about whether the user applied to the job or not. Since the back-end is not there for this, we store this in `localStorage` or `cookies`.
- You can assume the user already has a profile to apply with.
- When the user has applied to the job, a label "applied" appears in the top right corner (see design), both in the job description page and in the results page.
## Design
- You will find everything related to the design (assets, font sizes, colors, sizes) here: https://zpl.io/a75pWrK. You should have already received an invitation link.
## Guidelines
- Please add comments in code explaining the decisions that you have taken whenever necessary, especially if you are not using Ruby on Rails.
- Look for parts of code that needs refactoring and refactor them before submitting the solution.
## Deliverables
- Create a repository on github (or gitlab) with the solution, add yoanadimova (gitlab), yoanad (github) or just yoana.dimova@experteer.com as a collaborator and send us the link to the repo.
## Bonus
- Using a CSS preprocessor of your choice
- Using a naming convention of your choice for front-end (e.g. BEM).
- Cross-device (more bonus points for mobile-friendly, think flexbox) and cross-browser compatibility.
- Fabulous, but efficient loading animation

![](https://d2mxuefqeaa7sj.cloudfront.net/s_FED1F845C94B987EBDABD77C408FC054532946C0438C3D6CCDCE09E0929C0CA9_1548688962735_076-loading-large.gif)