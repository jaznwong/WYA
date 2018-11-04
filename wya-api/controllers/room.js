const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize');

const router = express.Router();


router.get('/hardcode', (req, res) => {
  let hardCodedRooms = []
  for (let i = 0; i < 5; i++){
    hardCodedRooms.push(models.Rooms.create({
      name: `Test Room ${i}`,
      isFinalized: false
    }));
  }
  Promise.all(hardCodedRooms).then(function(data){
    res.json({
      msg: "Successfully hardcoded Rooms"
    });
  });
});

router.get('/', (req, res) => {
  models.Rooms.findAll().then(rooms => {
    res.json({
      roomList: rooms
    })
  });
});

router.get('/:searchQuery', (req, res) => {
  models.Rooms.findAll({
    where: {
      name: {[Sequelize.Op.like] : `%${req.param('searchQuery')}%`}
    }
  }).then(rooms => {
    res.json({
      roomList: rooms
    })
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/', (req, res) => {
  models.Rooms.destroy({where: {}}).then(function () {
    res.json({
      msg: "Deleted All Rooms",
    });
  });
});


module.exports = router;
