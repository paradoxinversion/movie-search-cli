const http = require("http");
const cheerio = require("cheerio");
let $;
const query = process.argv[2].replace(/\s/g, "");

const options = {
  host: "www.imdb.com",
  path: `/find?ref_=nv_sr_fn&q=${query}&s=all`
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

    const titleResults = $(".findSection").first().find(".findList").find(".findResult");
    titleResults.each(function(i){
      results[i] = $(this).text().trim();
    });
    printResults(results);
  });
});
req.end();
