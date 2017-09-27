const expect = require("chai").expect;
const movieSearch = require("../movie-search");
describe("movie-search", function(){
  describe("move-search.printResults()", function(){
    let testResults = [
      'Baby Driver (2017)',
      'Baby Driver (2017) (TV Episode) - Roeper\'s Reviews (2015) (TV Series)',
      'Baby Driver (2017) (TV Episode)  - Season 2 | Episode 26  - Caillou Pettis Movie Reviews (2016) (TV Series)',
      'Baby Driver (2017) (TV Episode)  - Season 1 | Episode 17  - Sean Bradley Reviews (2016) (TV Series)',
      'Baby Driver (2017) (TV Episode)  - Season 3 | Episode 3  - Misinformed Movieguy (2015) (TV Series)',
      'Baby Driver (2017) (TV Episode)  - Season 7 | Episode 15  - Projector (2010) (TV Series)'
    ];
    
    it ("Returns a string with array elements on a new line", function(){
      expect(movieSearch.printResults(testResults)).to.equal(testResults.join("\n"));
    });
  });
  describe("move-search.processQuery", function(){
    it ("Should return a list of results with whitespace trimmed");
  });
});
