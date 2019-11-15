const axios = require("axios")
const cheerio = require('cheerio')
const tableparser = require('cheerio-tableparser');

const { parse } = require('json2csv');

const fs = require('fs');

const fetchData = async(year) => {
    let url = `https://www.baseball-reference.com/leagues/MLB/${year}.shtml`
    console.log(url)
    const result = await axios.get(`https://www.baseball-reference.com/leagues/MLB/${year}.shtml`);
    return cheerio.load(result.data)
}

async function getData(year) {
    let data = await fetchData(year);
    let $ = data;

    tableparser($);
    fs.writeFileSync(`${year}-raw.csv`, parse($('#teams_standard_batting').parsetable(true,true,true)))
}
let years = [2015,2016,2017,2018,2019]
years.forEach(year => {
    getData(year)
})