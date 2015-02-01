deck tools
===
Create RESTful in seconds, not weeks.

status
===
[![Code Climate](https://codeclimate.com/github/MoNoApps/deck/badges/gpa.svg)](https://codeclimate.com/github/MoNoApps/deck)


filters
===
Filters are rules to guide data into db.
`````js
// schema filter sample
var filters = require('../helpers/filters');

var theUser = {name:"username", date: new Date().getTime()};
var schema = {name: true, date: true, city: true};

filters.schemaFilter(theUser, schema, function(err){
  if(err){ console.error('Error ...'); }
  else{ console.log('Pass ...'); }
});
``````
Ordering rules : INPUT, MANGLE,  OUPUT.

resources
===
All autogenerated models are defined on config.json file.
`````json
  "resources": {
    "tokens":  { "param": "token", "exclude": true },
    "users":  { "param": "user" },
    "groups": { "param": "group" },
    "roles":  { "param": "role" },
    "tasks":  { "param": "task" }
  }
`````
Add '"exclude": true' to prevent endpoints creation but models creation.

`````json
// edit config.json to rename version:
  "APIVARS": {
    "PRE": "/v2"
`````

seed mirgation
===
Add data into migrations/data/[model]

`````sh
node migrations/seed.js
`````

nginx
===
Proxy pass for web '/' base and '/api'
`````js
upstream webserver {
  server 127.0.0.1:1344;
}

upstream apiserver {
  server 127.0.0.1:1345;
}

server {
  listen 80;
  server_name .my.custom.domain.co;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxxy true;

    proxy_pass http://webserver;
    proxy_redirect off;
  }

  location /api/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxxy true;

    proxy_pass http://apiserver;
    proxy_redirect off;
  }
}
`````
migrations
===
Take a look at the migrations folder.
`````sh
//insert migrations/data/users.json
node migrations/seed.js
`````

gulp config
===
We have two tasks:
  * [lint] check all javascript files
  * [minify] uglify and concat to public/application.js
  * [styles] minify css intoapplication.css

`````sh
gulp
`````

mandril config
===
Register on mandril and add your details con config.json:
`````json
 "mandril":{
   "from": "decktool@mail.co",
   "name": "Decks Tools",
   "token": ""
 }
`````

run
===
`````js
node app.js
`````

tools
===
`````text
[x] MPill
[x] Angular
[x] Bootstrap
[x] Restify
[x] Express
[x] MongoDB
[x] Gulp 
[x] Mandril
`````

ToDo
===
`````text
[ ] Add dinamic angular resources
[ ] Add read-only api endpoints if is not auth
[ ] Add filterts to RESTful dinamic creation
[ ] Add socket io
[ ] Add nested models api routes
[ ] Add common command line shortcuts
`````
