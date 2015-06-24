var app = window.angular.module('deckApp', ['ng', 'ngResource']);
if(app){
  console.log('ng:app');
  var socket = window.io();
  socket.emit('report', location.pathname);
}
