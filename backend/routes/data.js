const router = require("express").Router();
let Data = require("../models/data-model");

router.route("/add").post((req,res) => {
    const name = req.body.name;

    const DataUp = new Data({
        name
    });

    DataUp.save()
        .then(() => res.json("Data Uploaded!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Data.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Data.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Data.findByIdAndDelete(req.params.id)
        .then(() => res.json('Contact Deleted...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;