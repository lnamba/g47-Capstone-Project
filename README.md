# Hanyu.co/Spiffy Ventures Capstone Project

## Description
This project was submitted as my Capstone project for the Galvanize g47 Full Stack Immersive Program. My project was provided by Phoenix-based startup, Spiffy Ventures, and was designed to be integrated with their current Mandarin Chinese language learning web service, Hanyu.co. It is an educational app that gamifies the language learning experience. Hanyu.co users can login with their existing credentials and play the game using sentences that target their current Mandarin comprehension level.

## Technologies
My project was build using the following technologies:
* Vue.js
* Vuex (state management pattern)
* Vue-Router
* Axios
* Zurb Foundation (styling framework)
* d3.js (data visualization library)

## Gameplay
Upon successfully logging in, the user will land on a dashboard which explains the game. When the player clicks the "Start" button, they will see one of three different exercise types: Chinese to English, English to Chinese, or Listening. These are randomized, so the type may change with each question. The user will also either see or hear a sentence written/read aloud in either Chinese or English. There are shuffled tiles at the bottom of the screen which the player will then need to rearrange into the correct order. If they are correctly arranged, the user will be able to pass to the next exercise. Otherwise, the player will be able to click the tiles to move them off the board and try again or click the "Show Answer" button to view the tiles in the correctly arranged order.

At the end of the round, the user will see a summary page with the amount of questions they answered correctly along with the percentage. Good luck and enjoy the game!

### Credits
Thanks to Tommaso Marcelli for the basic vue-foundation repo, which I used to incorporate the Zurb Foundation Framework into this Vue application.
