const {Router} = require('express');
const router = Router();
const moneyModel = require('../models/moneyModel');

router.get('/', (_, res) => {
	moneyModel.find({}).exec()
	.then(data => res.render('home',{'all_datas': data}))
	.catch(err => res.status(500).send(err))
});

router.post('/', (req, res) => {
	const money = new moneyModel(req.body);
	console.log(money)
	if(!money.validateSync()){
		money.save()
		.then(() => res.json({'msg':'저장 완료!!'}))
		.catch(err => res.status(500).send(err))
	}
})

module.exports = router;