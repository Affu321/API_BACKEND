const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response")
const { Console } = require("console")
app.use(bodyParser.json())





app.get("/", (req, res) => {
    response(200, "API (10 Ready)","Success",res)
})


app.get("/mahasiswa", (req, res) => {
    const sql = 'SELECT * FROM mahasiswa'
    db.query(sql,  (err, fields) =>{
        response(200,fields,"mahasiswa get list", res)
    })
  })

app.get("/mahasiswa/:nim", (req, res) => {
   const nim = req.params.nim
   const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
   db.query(sql, (err, fields) =>{
    if (err) throw err
    response(200, fields, 'detail mahasiswa', res)
   })
  })


app.post('/mahasiswa', (req, res) => {
    const { nim, nama, alamat, kelas } = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama, alamat, kelas) VALUES 
    (${nim}, '${nama}', '${alamat}','${kelas}')`
    db.query(sql, (err, fields) =>{
        if (err) response(500, "invalid","eror" , res)
        if (fields?.affectedRows){
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "data add", res)
        }
       })
    })


app.put('/mahasiswa', (req, res) => {
    const {nim, nama, alamat, kelas} = req.body
    const sql = `UPDATE mahasiswa SET nama = '${nama}', alamat = '${alamat}', kelas = '${kelas}' WHERE nim = ${nim}`
    db.query(sql,(err, fields) => {
        if (err) response(500, "invalid","eror" , res)
        if (fields?.affectedRows){
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message,
            }
            response(200,data,'data update',res)
        }else{
            response(404,"not found",'eror',res) 
        }
    })
})

app.delete('/mahasiswa', (req, res) => {
    const {nim} = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql,(err, fields) => {
        if (err) response(500, "invalid","eror" , res)
        console.log(fields)
    })
            response(200,"delete",'eror',res) 
        })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})