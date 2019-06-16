let express = require('express');
let router = express.Router();
let dobby_path = require('path').join(__dirname, "../kr_dobby/index");
let Dobby = require(dobby_path);

router.post('/', (req, res) => {
    console.log(req.body.query);
    let dobby = new Dobby();
    dobby.ask(req.body.query).then((dobby_res)=>{
        const answer = dobby_res[0];
        const accuracy = dobby_res[1];
        res.send({result:0, data:{"answer":answer, "accuracy":accuracy}});
    });
});

module.exports = router;
