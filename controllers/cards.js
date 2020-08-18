const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .populate('user')
    .then(cards => res.send({ data: cards}))
    .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка'}));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId  })
    .then(card => res.send({ data: card}))
    .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка'}));
}

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card}))
    .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка'}));
}
