const http = require("http");
const cheerio = require("cheerio");
let $;
const query = process.argv[2];
const options = {
  host: "www.imdb.com",
  path: "/find?ref_=nv_sr_fn&q=findingnemo&s=all"
};

const printResults = function(resultArr){
  resultArr.forEach(function(result){
    console.log(result);
  });
};

const req = http.request(options, (res) =>{
  var str = "";
  res.on("data", function(chunk){
    str += chunk;
  });

  res.on("end", function(){
    const results = [];
    $ = cheerio.load(str);
    $(".findResult").each(function(i){

      results[i] = $(this).text().replace(/ {2,}/g, "");
    });
    printResults(results);
  });
});
req.end();
