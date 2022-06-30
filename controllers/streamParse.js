'use strict';
const https = require('https');
const _ = require('lodash');
const json2csv = require('json2csv');
const {FileConvertSize} = require('../lib/utils')
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

function exportCsv(req,res){
    https.get('https://www.lepoint.fr/politique/rss.xml', function(resultat) {
        let data = '';
        resultat.on('data', function(stream) {
            data += stream;
        });
        resultat.on('end', function(){
            parser.parseString(data, function(error, result) {
                if(!error) {
                    const tab = [];
                    let items = result.rss.channel[0].item;
                    for (let i = 0; i < items.length; i++) {
                        tab.push({
                            id : i,
                            title: items[i]["title"][0],
                            description: _.truncate(items[i]["description"][0], {length:68}),
                            articleUrl: items[i]["link"][0],
                            imageUrl: items[i]["enclosure"][0]["ATTR"]["url"],
                            imageSize: FileConvertSize(items[i]["enclosure"][0]["ATTR"]["length"])
                        })
                    }
                    const jsonParser = new json2csv.Parser();
                    res.attachment('data.csv');
                    res.status(200).send(jsonParser.parse(tab))
                }
                else {
                    res.status(400).send(error);
                    console.log(error);
                }
            });
        });
    });
}

module.exports = {
    exportCsv
}