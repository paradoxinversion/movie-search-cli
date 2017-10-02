/**
 * @file Scrapes IMDB results
 * @author Jedai Saboteur
 */
const http = require("http");
const rp = require("request-promise");
const cheerio = require("cheerio");
let $;

/**
 * The query argument for the search
 * @const {string} query
 */
const query = process.argv[2].replace(/\s/g, "");

const pathOptions = {
  host: "www.imdb.com",
  path: `/find?ref_=nv_sr_fn&q=${query}&s=all`
};

const printResults = function(str){
  console.log(str);
};

/**
 * Joins the elements from getQueryMatches with a newline
 * @name joinResults
 * @param {Array} resultArr The Array of results to join
 * @returns {string} Each element in the supplied array, separated by a new line
 **/
const joinResults = function(resultArr){
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

const runSearch = function(pathOptions){
  const fullPath = "http://" + pathOptions.host + pathOptions.path;
  rp(fullPath)
    .then(function(htmlString){
      return processQuery(htmlString);
    })
    .then(function(cheerioResult){
      return getQueryMatches(cheerioResult);
    })
    .then(function(resultsArray){
      return joinResults(resultsArray);
    })
    .then(function(final){
      printResults(final);
    })
    .catch(function(err){
      console.error(err);
    });
};

runSearch(pathOptions);

module.exports = {joinResults};
