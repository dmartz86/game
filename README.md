deck tools
===
Create RESTful in seconds, not weeks.

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

run
===
`````js
node app.js
`````

gulp config
===
We have two tasks:
  * [lint] check all javascript files
  * [minify] uglify and concat to public/application.js

`````sh
gulp
`````

ToDo
===
`````text
[ ] Add dinamic angular resources
[ ] Add read-only api endpoints if is not auth
[ ] Add filterts to RESTful dinamic creation
[ ] Add socket io
`````
