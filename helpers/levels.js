var shuffle = require('../helpers/utils').shuffle;

var level = function(first, last) {
  var range = [];
  var boards = [];

  for(var i=first; i<last+1; i++) {
    range.push({c: String.fromCharCode(i), o: i});
  }

  var ll = range.length-7;
  for(var j=0; j<ll; j++) {
    var board = range.slice(0,8);
    boards.push({
      number: j+1,
      range: first + '::' + last,
      board: shuffle(board.concat(board)),
    });
    range.shift();
  }

  return boards;
};

module.exports = level;
