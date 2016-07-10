TO START SERVER
node ./bin/start-server.js

need to add dependencies after npm init
(or node wont work)
so eg do npm install --save node-fetch
then read how to use - ie require it in file

npm install --save body-parser
node fetch etc

work on undersatanding variable scope

accessing objects in an array of objects
not map in this case
use for Each
function foreach takes 1 argument which is a fuction to be called on each el in the array
in this case that is an object
and you can access that objects props using eg object.commit

    var obj = { name: 'Alice', colour: 'Pink' };

    // Dot syntax
    obj.name      // This returns 'Alice'
    obj.colour    // This returns 'Pink'

    // Brace syntax
    obj['name']   // This returns 'Alice'
    obj['colour'] // This returns 'Pink'


so for each item in the array, which is an object i want to say 
    is .commits !== 0? if so, create an object that is num-of-days with start date, and if the next object in the array is non ero i want to increment number of days and increment the date. 
    This will hopefully automatically stop when comits is 0 so that NEXT time it isnt zero, it will create a new object.

Next up - making a web page
[] somehow insert all this stuff into html


what i want to do now

ok so i have a root page / and it has a form and on it the user puts their name. I need to take this name (and louis says i do this using javascript) and pass it to index.js.
 so how do i send data from client side to server side WITOUT using post? how do i get data from the form? 

 Also, how do i get my data from out of my functions as its all async and time dependent?
 I guess I could create a file and write to that instead of writing to console? and sort of use that as my api?
 or i could write to div...
 
 Also, the post thing totally works in that i can serve streaks.ejs or print meep... but i still dont know how to really access that variable.

SVG STUFFFFFFFFFF

ok so it all works fine ish BUT the main problem now is that inserting the svg into the VIEW with stringify makes it all escaped  - this is unsuprising

I need to have a client-side.js file that somehow inserts the svg into the dom maybe? Need to ask louis about this. Because of course, I can't actually access the streakInfo data outside of wherever i call the function....

HOWEVER it is worth noting that when I use res.json(streakInfo) which is basically res.send, the svg is NOT escaped - can i somehow use that???

nope - you can escape it - yay! And i can put it in script tags too or just render it straight in the body.

NOTE
ask louis why something has to be a javascript object literal to be returned???


NEXT
need to get the username from the form


Can i do something like
into the index view in the script tag:
say 
get window.location.hash
or
just put form handling logic in the script tag
Then send user to that url... use url encode etc.

louis says use input and onchange not form and onclick.

sad path ie if username not found
(and maybe - are you sure you entered it like this...)

if response isn't 200 throw an exception in the first bit of the promise, then use a promise .catch to render another view to the user

strip script tags but only those in ejs

use mocha and chai for testing

clean up code
remove notes ie put in gitignore again


make scrolling parallax over svg with got streak.

Louis:(on making an api)
So I suggest you refractor out all the logic in your route so you have a new method called lookupStreak or something that does the fetch and then the parsing and then returns a promise

Then in your route you just say lookupStreak(username).then(streakInfo => res.render("my-view", streakInfo).catch(err => res.render("not-found-view", { error: err })
)
Then make a second route

/api/streak/: username or something

Same logic, just wrapped up differently
Because we want to reuse it in the other view
Other route sorry

LOUIS:
Things to think about:
Have you covered the sad path as well as the happy path? I.e. what happens if the user types in a name that isn't registered on github?
Can we strip script tags from that svg? I know there are none, but it's needed for security.
Does the code look clean? Indented, no commented out bits, etc?
What can we test?
Does the readme have good info?
Deploy the app!
cool. i dunno what you mean about the svg. If I strip the tags it wont render...
I will do the rest (like the sad path - good name ☺ )
Louis Pop (louispopinjay@gmail.com)
We can find a way to only strip script tags :)
OH I see - yeah ok, cool
Louis Pop (louispopinjay@gmail.com)
I imagine that if the account isn't found you won't get a 200 status code of the fetch request
Good place to start
If response isn't 200 throw an exception in the first bit of the promise, then use a promise .catch to render another view to the user

CANT DO
errors
load layout for streaks page

npm run dev to run nodemon server


to do
404 page for random routes
404 for github username not found giving another try and being like its just THIS part of the url you dummy...

make partials called header and footer

say (on streaks view) this info is available as json here in the API and give link - WOOOP

deploy in heroku

heroku will give me ports to bind to as environment variables.
It expects a particular port 


NB
Do github language bar hr app


deployment

install heroku toolbelt
```
heroku
heroku apps:create git-streak
git remote -v //checks if git remote exists
git push heroku master
```
now deployed on heroku
AND can use gui on heroku to change domain (in settings). Then need to go to cloudflare and go to DNS tab and then chose cname and use git-streak as name and git-streak.herokuapp.com as value (TTL automatic) and that will reroute/change domain to git-streak.scripttease.uk
