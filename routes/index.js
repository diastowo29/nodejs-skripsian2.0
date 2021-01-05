var express = require('express');
var router = express.Router();
const { status_table } = require('../sequelize')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ping', function(req, res, next) {
  var rArus = req.body.r.arus;
  var rTegangan = req.body.r.tegangan;
  var sArus = req.body.s.arus;
  var sTegangan = req.body.s.tegangan;
  var tArus = req.body.t.arus;
  var tTegangan = req.body.t.tegangan;
  status_table.findAll().then(statusTableAll => {
    var preStatus = false;
    if (statusTableAll.length == 0) {
      status_table.create({
        r_arus: rArus,
        r_tegangan: rTegangan,
        s_arus: sArus,
        s_tegangan: sTegangan,
        t_arus: tArus,
        t_tegangan: tTegangan,
        status_r: preStatus,
        status_s: preStatus,
        status_t: preStatus,
        notes: "sample notes"
      })
    } else {
      status_table.update({
        r_arus: rArus,
        r_tegangan: rTegangan,
        s_arus: sArus,
        s_tegangan: sTegangan,
        t_arus: tArus,
        t_tegangan: tTegangan
      }, {
        where: {
          id: statusTableAll[0].id
        }
      });
    }
    res.status(200).send({
      status: statusTableAll[0]
    });
  });
});

router.get('/ping/:r_arus/:r_tegangan/:s_arus/:s_tegangan/:t_arus/:t_tegangan', function(req, res, next) {
  var rArus = req.params.r_arus;
  var rTegangan = req.params.r_tegangan;
  var sArus = req.params.s_arus;
  var sTegangan = req.params.s_tegangan;
  var tArus = req.params.t_arus;
  var tTegangan = req.params.t_tegangan;
  status_table.findAll().then(statusTableAll => {
    var preStatus = false;
    if (statusTableAll.length == 0) {
      status_table.create({
        r_arus: rArus,
        r_tegangan: rTegangan,
        s_arus: sArus,
        s_tegangan: sTegangan,
        t_arus: tArus,
        t_tegangan: tTegangan,
        status_r: preStatus,
        status_s: preStatus,
        status_t: preStatus,
        notes: "sample notes"
      })
    } else {
      status_table.update({
        r_arus: rArus,
        r_tegangan: rTegangan,
        s_arus: sArus,
        s_tegangan: sTegangan,
        t_arus: tArus,
        t_tegangan: tTegangan
      }, {
        where: {
          id: statusTableAll[0].id
        }
      });
    }
    res.status(200).send({
      status: {
        r_arus: rArus,
        r_tegangan: rTegangan,
        s_arus: sArus,
        s_tegangan: sTegangan,
        t_arus: tArus,
        t_tegangan: tTegangan,
        status_r: statusTableAll[0].status_r,
        status_s: statusTableAll[0].status_s,
        status_t: statusTableAll[0].status_t,
        notes: statusTableAll[0].notes
      }
    });
  });
})

router.get('/ping-off/:status_r/:status_s/:status_t', function (req, res, next) {
  var status_r = req.params.status_r;
  var status_s = req.params.status_s;
  var status_t = req.params.status_t;
  status_table.findAll().then(statusTableAll => {
    if (statusTableAll.length != 0) {
      status_table.update({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      }, {
        where: {
          id: statusTableAll[0].id
        }
      });
    }
    res.status(200).send({
      status: {
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      }
    });
  });
})

router.get('/dashboard', function(req, res, next) {
  status_table.findAll().then(statusTableAll => {
    res.render('dashboard', {
      dData: statusTableAll[0]
    });
  })
});

router.get('/dashboard-admin', function(req, res, next) {
  status_table.findAll().then(statusTableAll => {
    res.render('dashboard-admin', {
      dData: statusTableAll[0]
    });
  })
});

router.post('/update', function(req, res, next) {
  console.log(req.body)
  status_table.findAll().then(statusTableAll => {
    if (statusTableAll.length == 0) {
      console.log('null')
    } else {
      status_table.update({
        status_r: req.body.status_r,
        status_s: req.body.status_s,
        status_t: req.body.status_t,
        notes: req.body.notes
      }, {
        where: {
          id: statusTableAll[0].id
        }
      })
    }
  });
  res.send({})
})


module.exports = router;
