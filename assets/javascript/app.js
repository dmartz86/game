var app = window.angular.module('deckApp', ['ng', 'ngResource']);
if(app){
  console.log('ng:app');
  var socket = io();
  socket.emit('report', location.pathname);
}
