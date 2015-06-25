# deck tools
RESTful in seconds.

[![Code Climate](https://codeclimate.com/github/MoNoApps/deck/badges/gpa.svg)](https://codeclimate.com/github/MoNoApps/deck)
[![Test Coverage](https://codeclimate.com/github/MoNoApps/deck/badges/coverage.svg)](https://codeclimate.com/github/MoNoApps/deck/coverage)
[![Circle CI](https://circleci.com/gh/MoNoApps/deck.svg?style=svg)](https://circleci.com/gh/monoapps/deck)

## config
### api
### resources
### email
`````sh
# ping
node examples/ping.mandril.js
`````

## coding
### filters
### migrations
`````sh
# Warning: save a copy or your current db first
node migrations/seed.js
# drop current database and insert all defaults
`````

## deploy

Use [nginx config.](deck.conf)

## tools
`````js
var tools = ['MPill', 'Angular', 'Bootstrap', 'Restify', 'Express', 'MongoDB', 'Gulp', 'Mandril', 'Protractor', 'CircleCI']
`````
