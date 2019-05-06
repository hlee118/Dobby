let express = require('express');
let router = express.Router();
let kr_dobby = require("../kr_dobby/index");

router.get('/', (req, res) => {
    let dobby = new kr_dobby(req.body.query);
    dobby.ask().then((dobby_ans)=>{
        res.send(dobby_ans);
    });
});

module.exports = router;
