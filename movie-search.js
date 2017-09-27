const http = require("http");
const cheerio = require("cheerio");
let $;
const query = process.argv[2].replace(/\s/g, "");

const options = {
  host: "www.imdb.com",
  path: `/find?ref_=nv_sr_fn&q=${query}&s=all`
};

/**
 * Prints each element of the ResultsArr to a string with a newline
 * @name printResults
 * @param {Array} resultArr The Array of results to join
 * @returns {string} Each element in the supplied array, separated by a new line
 **/
const printResults = function(resultArr){
  return resultArr.join("\n");
};

/**
 * Takes a cheerio query and returns a raw list of matched items
 * @name getQueryMatches
 * @param {Object} cheerioQuery the result of the cheerio query
 * @returns {Array} A raw list of matched items (will include whitespace)
 **/
const getQueryMatches = function(cheerioQuery){
  const results = [];
  cheerioQuery.each(function(i){
    results[i] = $(this).text().trim();
  });
  return results;
};

/**
 * Processes the query to IMDB and returns a list of results with whitespace trimmed
 * @name processQuery
 * @param {string} str The str chunk to process
 * @returns {Object} Results of the query
 **/
const processQuery = function(str){
  $ = cheerio.load(str);
  return $(".findSection").first().find(".findList").find(".findResult");

};

const req = http.request(options, (res) =>{
  var str = "";
  res.on("data", function(chunk){
    //Here we are getting all of the data on the page
    str += chunk;
  });

  res.on("end", function(){

    console.log(printResults(getQueryMatches(processQuery(str))));
  });
});

req.end();

module.exports = {printResults};
