class DefaultController {

    index = (req, res) => {
        res.status(200).send('SigConsigAPI');
    }
}

module.exports = DefaultController;