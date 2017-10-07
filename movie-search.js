/**
 * @file Scrapes IMDB results
 * @author Jedai Saboteur
 */
const rp = require("request-promise");
const cheerio = require("cheerio");
let $;

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

const runSearch = function(searchQuery){
  searchQuery = searchQuery.replace(/\s/g, "");
  const fullPath = "http://www.imdb.com/find?ref_=nv_sr_fn&q=" + searchQuery;
  return rp(fullPath)
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
      // printResults(final);
      return final;
    })
    .catch(function(err){
      console.error(err);
    });
};

module.exports = {joinResults, runSearch};
