# ANGULAR SPA APP
## Installation: DOCKER

Run `docker pull codelammer/jumia-docker:first_image_push_test` to pull the image from docker hub

After pull run 
`docker run -p 8080:8080 codelammer/jumia-docker:first_image_push_test`

# About the project

#### UI
* My first approach was to design the user interface using Adobe XD (I personally prefer Adobe XD to figma although I still know how to use most of the design softwares like Illustrator, figma etc)
* I decided to use the table approach(list of users in a table) as it is more challenging to style responsively and I was up for the task. I used *David Rizo*'s approach on 'scrollable responsive tables as illustrated in his article https://css-tricks.com/accessible-simple-responsive-tables/.
* I highly advise to test this UI in a real mobile device and tablet 
* I only used angular material for the input fields but decided to be original in styling other elements
* The `add a user button` and `example nav` are just dummy elements to add aesthetics to the look and feel of the SPA.

#### What I implemented
* everything from integrating the app to `randomuser.me` api to filtering and exports.
* From the required topics I was able to work on everything there except unit testing.
* Reason being like I told you before in the first phase, I was still not comfortable with unit-testing(Jasmin, Karma) as I am still new to it and in the process of mastering it. I hope this won't be a problem :-)

#### Bonus topics
* I was able to implement infinite virtual scrolling 
* I would also implement the `Only request the fields that really need (based on the columns selected)` if I had more time
* Feel free to go through my commits history on this project github


## Alternative Installation
Alternatively, you can run this application locally by following the steps below after pull github repository

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server
Run `npm install` to install dependancies locally

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The CLI will automatically open a tab on your default browser with the application in it.
