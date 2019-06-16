let express = require('express');
let router = express.Router();
let analyzer_path = require('path').join(__dirname, "../analyzerKR/analyzer");
let dobby_path = require('path').join(__dirname, "../kr_dobby/index");
let wiki_path = require('path').join(__dirname, "../kr_wiki/index");
let Analyzer = require(analyzer_path);
let Dobby = require(dobby_path);
let Wiki = require(wiki_path);

router.post('/', (req, res) => {
    console.log({question:req.body.query});

    let dobby_data, wiki_data;
    let POSTResult = new Array();
    let analyzer = new Analyzer();
    analyzer.setQuery(req.body.query);
    analyzer.partOfSpeechTagging()
    .then((result)=>{
        const result_split = result.split('\'');
        for(let i=0;i<result_split.length;i++){
            if(i % 2 == 1)
                POSTResult.push(result_split[i]);
        }
        return;
    })
    .then(()=>{
        let dobby = new Dobby();
        return dobby.ask(POSTResult)
        .then((dobby_res)=>{
            const answer = dobby_res[0];
            const accuracy = dobby_res[1];
            dobby_data = {answer:answer, accuracy:accuracy};
        });
    })
    .then(()=>{
        let wiki = new Wiki();
        return wiki.ask()
        .then((wiki_res)=>{
            const answer = wiki_res[0];
            const accuracy = wiki_res[1];
            wiki_data = {answer:answer, accuracy:accuracy};
            return;
        });
    })
    .then((data)=>{
        let response = {result:0, data:{dobby:dobby_data, wiki:wiki_data}};
        res.send(response);
        console.log(response);
    })
});

module.exports = router;
