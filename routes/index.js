var express = require('express');
const { stat } = require('fs');
var router = express.Router();
const { statusV2_table, arusTeganganTable, notesTable, statusGarduTable, statusPingTable } = require('../sequelize');
// var json2xls = require('json2xls');
const excel = require("exceljs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping/:r_arus/:r_tegangan/:s_arus/:s_tegangan/:t_arus/:t_tegangan', function(req, res, next) {
  var rArus = req.params.r_arus;
  var rTegangan = req.params.r_tegangan;
  var sArus = req.params.s_arus;
  var sTegangan = req.params.s_tegangan;
  var tArus = req.params.t_arus;
  var tTegangan = req.params.t_tegangan;
  arusTeganganTable.create({
    r_arus: parseFloat(rArus).toFixed(2),
    r_tegangan: rTegangan,
    s_arus: parseFloat(sArus).toFixed(2),
    s_tegangan: sTegangan,
    t_arus: parseFloat(tArus).toFixed(2),
    t_tegangan: tTegangan
  }).then(arusCreated => {
    statusGarduTable.findAll().then(statusGardus => {
      if (statusGardus.length != 0) {
        res.status(200).send({
          status_r: statusGardus[0].status_r.toString(),
          status_s: statusGardus[0].status_s.toString(),
          status_t: statusGardus[0].status_t.toString()
        });
      } else {
        statusGarduTable.create({
          status_r: false,
          status_s: false,
          status_t: false
        })
      }
    })
    statusPingTable.findAll().then(statusGardus => {
      if (statusGardus.length == 0) {
        statusPingTable.create({
          status_r: false,
          status_s: false,
          status_t: false
        })
      }
    })
    notesTable.findAll().then(notesAll => {
      if (notesAll.length == 0) {
        notesTable.create({
          notes: 'Sample Notes'
        })
      }
    })
  })
})

router.get('/ping-off/:status_r/:status_s/:status_t', function (req, res, next) {
  var status_r = req.params.status_r;
  var status_s = req.params.status_s;
  var status_t = req.params.status_t;
  statusGarduTable.findAll().then(statusGardus => {
    if (statusGardus.length != 0) {
      statusGarduTable.update({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      }, {
        where: {
          id: statusGardus[0].id
        }
      });
    } else {
      statusGarduTable.create({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      })
    }
    res.status(200).send({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
    });
  });
  statusPingTable.findAll().then(statusGardus => {
    if (statusGardus.length != 0) {
      statusPingTable.update({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      }, {
        where: {
          id: statusGardus[0].id
        }
      });
    } else {
      statusPingTable.create({
        status_r: status_r,
        status_s: status_s,
        status_t: status_t
      })
    }
  });
})

router.get('/arus-download', function(req, res, next) {
  arusTeganganTable.findAll().then(aruss => {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    aruss.forEach(arus => {
      var date = new Date(arus.createdAt);
      date.setHours(date.getHours() + 7);
      arus['new_createdAt'] = new Date(date).toISOString()
    });

    console.log(aruss)

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Arus R", key: "r_arus", width: 10 },
      { header: "Tegangan R", key: "r_tegangan", width: 10 },
      { header: "Arus S", key: "s_arus", width: 10 },
      { header: "Tegangan S", key: "s_tegangan", width: 10 },
      { header: "Arus T", key: "t_arus", width: 10 },
      { header: "Tegangan T", key: "t_tegangan", width: 10 },
      { header: "Time", key: "new_createdAt", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(aruss);

    // res is a Stream object
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Gardu - " + Math.random().toString(36).slice(2) + ".xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  })
})

router.get('/arus_tegangan', function(req, res, next) {
  arusTeganganTable.findAll().then(aruss => {
    res.status(200).send(aruss)
  })
});

router.get('/arus-delete-all', function(req, res, next) {
  arusTeganganTable.destroy({truncate: true});
  arusTeganganTable.create({
    r_arus: 0,
    r_tegangan: 0,
    s_arus: 0,
    s_tegangan: 0,
    t_arus: 0,
    t_tegangan: 0
  })
  res.status(200).send({})
});

router.get('/dashboard', function(req, res, next) {
  arusTeganganTable.findAll().then(aruss => {
    var arusLastIndex = (aruss.length-1);
    statusGarduTable.findAll().then(statusTableAll => {
      notesTable.findAll().then(notess => {
        statusPingTable.findAll().then(statusPings => {
          res.render('dashboard', {
            dData: aruss[arusLastIndex],
            status_pings: statusPings[0],
            notes: notess[0]
          });
        })
      })
    })
  })
});

router.get('/dashboard-admin', function(req, res, next) {
  arusTeganganTable.findAll().then(aruss => {
    var arusLastIndex = (aruss.length-1);
    statusGarduTable.findAll().then(statusTableAll => {
      notesTable.findAll().then(notess => {
        statusPingTable.findAll().then(statusPings => {
          res.render('dashboard-admin', {
            dData: aruss[arusLastIndex],
            statuses: statusTableAll[0],
            status_pings: statusPings[0],
            notes: notess[0]
          });
        })
      })
    })
  })
});

router.get('/get-all', function(req, res, next) {
  arusTeganganTable.findAll().then(aruss => {
    var arusLastIndex = (aruss.length-1);
    statusGarduTable.findAll().then(statusTableAll => {
      notesTable.findAll().then(notess => {
        statusPingTable.findAll().then(statusPings => {
          res.status(200).send({
            arus_tegangan: aruss[arusLastIndex],
            status: statusTableAll[0],
            status_ping: statusPings[0],
            notes: notess[0]
          })
        })
      })
    })
  })
});


router.post('/update', function(req, res, next) {
  statusGarduTable.findAll().then(statusGardus => {
    if (statusGardus.length == 0) {
      console.log('null')
    } else {
      statusGarduTable.update({
        status_r: req.body.status_r,
        status_s: req.body.status_s,
        status_t: req.body.status_t
      }, {
        where: {
          id: statusGardus[0].id
        }
      })
    }
  }).then(statusUpdated => {
    notesTable.findAll().then(notesAll => {
      if (notesAll.length == 0) {
        notesTable.create({
          notes: req.body.notes
        })
      } else {
        notesTable.update({
          notes: req.body.notes
        }, {
          where: {
            id: notesAll[0].id
          }
        })
      }
      statusPingTable.findAll().then(statusGardus => {
        if (statusGardus.length != 0) {
          var updatePayload = {};
          if (req.body.status_r) {
            updatePayload['status_r']= req.body.status_r
          }
          if (req.body.status_s) {
            updatePayload['status_s']= req.body.status_s
          }
          if (req.body.status_t) {
            updatePayload['status_t']= req.body.status_t
          }
          console.log('= UPDATE PING =')
          console.log(updatePayload)
          statusPingTable.update(updatePayload, {
            where: {
              id: statusGardus[0].id
            }
          });
        } else {
          statusPingTable.create({
            status_r: req.body.status_r,
            status_s: req.body.status_s,
            status_t: req.body.status_t
          })
        }
        res.send({})
      });
    })
  });

})


module.exports = router;
