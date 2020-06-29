const express = require('express')
const knex = require('knex')
const app = express()
const cors = require('cors')
const request = require('request')
const user = 'IRSYkqTyNep22276244pB9TuBUoBytYTN1'
const password = '2GBhaG~vQWZBKpjTohvSJdracm~Sf9vh'
const url = 'http://' + user + ':' + password + '@api.impact.com'
const {DB_URL} = require('./config')
const headers = {Accept: 'application/json'}

app.use(express.json());
app.use(cors())

const db = knex({
    client: 'pg',
    connection: DB_URL,
})

let numViews = 0

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.get('/', (req, res) => {
  
  numViews++;
  
   console.log(numViews)
})
  
  app.get('/bullet', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bullet'})
      .then(typeData => {
          if (typeData.length === 0) {
              request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Shooting > Reloading > Reloading Bullets'`, headers: headers}, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      
                      let newItems = JSON.parse(body)
                      res.json(newItems)
                      console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'bullet',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
})
  

app.get('/case', (req, res) => {
  db
    .select('*')
    .from('types')
    .where({type: 'case'})
    .then(typeData => {
        if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Rifle Brass'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                    db('types')
                        .insert([{
                            type: 'case',
                            data: JSON.stringify(newItems)
                        }])
                        .catch(error => {
                            return res.json(error)
                        })
                }
            });
              
        } else {
            res.json(typeData[0].data)
            console.log('Get From Database Was Successful')
        }
    })
})

  app.get('/powder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'powder'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Rifle Powder'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newBody = JSON.parse(body)
                    let newItems = []
                   for(let i = 0; i < newBody.Items.length; i++) {
                        if(newBody.Items[i].Name.includes('Rifle powder')) {
                            newItems.push(newBody.Items[i])
                        }
                    }
                    newBody.Items = newItems
                    res.json(newBody)
                    console.log('Get Was Successful')
                    db('types')
                                .insert([{
                                    type: 'powder',
                                    data: JSON.stringify(newBody)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/primer', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'primer'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Powder/Caps'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'primer',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/press', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'press'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Shooting > Reloading > Reloading Presses & Press Kits'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                    db('types')
                        .insert([{
                            type: 'press',
                            data: JSON.stringify(newItems)
                        }])
                        .catch(error => {
                            return res.json(error)
                        })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/dies', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'dies'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Shooting > Reloading > Reloading Dies'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'dies',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/shellholder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'shellholder'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Shellholders'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'shellholder',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/primingtool', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'primingtool'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Priming Tools'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newBody = JSON.parse(body)
                    let newItems = []
                   for(let i = 0; i < newBody.Items.length; i++) {
                        if(newBody.Items[i].Name.includes('primingtools')) {
                            newItems.push(newBody.Items[i])
                        }
                    }
                    newBody.Items = newItems
                    res.json(newBody)
                    console.log('Get Was Successful')
                    db('types')
                                .insert([{
                                    type: 'primingtool',
                                    data: JSON.stringify(newBody)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/powdermes', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'powdermes'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Shooting > Reloading > Powder Handling'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newBody = JSON.parse(body)
                    let newItems = []
                   for(let i = 0; i < newBody.Items.length; i++) {
                        if(newBody.Items[i].Name.includes('powdermes')) {
                            newItems.push(newBody.Items[i])
                        }
                    }
                    newBody.Items = newItems
                    res.json(newBody)
                    console.log('Get Was Successful')
                    db('types')
                                .insert([{
                                    type: 'powdermes',
                                    data: JSON.stringify(newBody)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/scale', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'scale'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Powder Measures & Scales'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'scale',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/calipers', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'calipers'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Calipers'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'calipers',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/casecleaner', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'casecleaner'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Case Cleaning & Prep'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'casecleaner',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/casetrimmer', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'casetrimmer'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Case Cleaning & Prep'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'casetrimmer',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/caselube', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'caselube'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Shooting > Reloading > Case Preparation'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newBody = JSON.parse(body)
                    let newItems = []
                   for(let i = 0; i < newBody.Items.length; i++) {
                        if(newBody.Items[i].Name.includes('caselube')) {
                            newItems.push(newBody.Items[i])
                        }
                    }
                    newBody.Items = newItems
                    res.json(newBody)
                    console.log('Get Was Successful')
                    db('types')
                                .insert([{
                                    type: 'caselube',
                                    data: JSON.stringify(newBody)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/casechamf', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'casechamf'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Case Cleaning & Prep'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newBody = JSON.parse(body)
                    let newItems = []
                   for(let i = 0; i < newBody.Items.length; i++) {
                        if(newBody.Items[i].Name.includes('casechamf')) {
                            newItems.push(newBody.Items[i])
                        }
                    }
                    newBody.Items = newItems
                    res.json(newBody)
                    console.log('Get Was Successful')
                    db('types')
                                .insert([{
                                    type: 'casechamf',
                                    data: JSON.stringify(newBody)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/flashhole', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'flashhole'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Case Cleaning & Prep'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'flashhole',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/primerpocket', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'primerpocket'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Primer Pocket'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'primerpocket',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

app.get('/bulletpuller', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bulletpuller'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Bullet Puller'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'bulletpuller',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/comparator', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'comparator'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Bullet Comparator'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'comparator',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/seating', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'seating'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'OAL Gauges'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'seating',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/headgauge', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'headgauge'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Headspace Gauge'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'headgauge',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/concentricity', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'concentricity'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Concentricity Tool'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'concentricity',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  
  
  app.get('/prevpage', (req, res) => {
      request({url: `${url}${req.query.uri}&Query=${req.query.Query}`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)

              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/nextpage', (req, res) => {
      request({url: `${url}${req.query.uri}&AfterId=${req.query.AfterId}&Query=${req.query.Query}`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })

app.get('/search', (req, res) => {
    request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'${req.query.keyword}'`, headers: headers}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let newItems = JSON.parse(body)
            
            res.json(newItems)
            console.log('Get Was Successful')
        }
    });
    console.log(`${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'${req.query.keyword}'`)
})

app.get('/test', (req, res) => {
    /*request({url: `${url}/Catalogs/ItemSearch?Query=Category='bullet'`, headers: headers}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            res.json(body)
        }
});*/
    res.json('test')
})

/*const http = require('http');
router.get('/impactApi', (req, res) => {
  http.request(
    IMPACT_API_ENDPOINT,
    {
      method: 'POST'
      body:  generateRequestBody(req),
      headers: generateImpactHeaders(req)
    },
    (apiResponse) => {
      res.statusCode = apiResponse.statusCode;
      let apiBody = '';
      res.on('data', chunk => apiBody += chunk);
      res.on('end', () => {
        res.send(parseApiResponse(apiBody));
      });
    }
  );
});*/
