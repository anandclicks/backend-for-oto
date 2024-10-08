const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const nodemailer = require('nodemailer')
app.use(express.urlencoded({extended : true}))
app.use(express.json())
const core = require('cors')
app.use(core())

const transporter = nodemailer.createTransport({
  service : 'Gmail',
  auth : {
    user : process.env.EMAIL_ID,
    pass : process.env.PASSWORD
  }
})

transporter.verify((error,response)=> {
  if(error) {
    console.log(error)
  }
  else {
    // console.log("Transporter is ready to send mails")
    app.listen(3001)
  }
})


app.post('/getAcall',async(req,res)=> {
  const {name,mobileNumber,email,roomType} = req.body
  let mailOption = {
    from : process.env.EMAIL_ID,
    to : process.env.TO_EMAIL,
    subject  : "New query",
    text : `
            Name  : ${name}
            Mobile number : ${mobileNumber}
            Email id : ${email}
            Room Sharing : ${roomType}
    `
  }
  try {
    let response = await transporter.sendMail(mailOption)
    res.status(200).send({message : "Email has sended succesfully", info : response})
  } catch (error) {
    res.send({message : "Something went wrong", error : error})
  }
})




app.post('/intrestedInproperty',async(req,res)=> {
  const { name, number, email, location, specificProperty} = req.body.formData
  let mailOption = {
    from : process.env.EMAIL_ID,
    to : process.env.TO_EMAIL,
    subject  : "New query",
    text : `
            name: ${name},
            number: ${number},
            email: ${email},  
            location: ${location},
            specificProperty: ${specificProperty},
    `
  }
  try {
    let response = await transporter.sendMail(mailOption)
    res.status(200).send({message : "Email has sended succesfully", info : response})
  } catch (error) {
    res.send({message : "Something went wrong", error : error})
  }
})




app.post('/getSupport',async(req,res)=> {
  const { name, number} = req.body

  let mailOption = {
    from : process.env.EMAIL_ID,
    to : process.env.TO_EMAIL,
    subject  : "New query",
    text : `
            name: ${name},
            number: ${number},
    `
  }
  try {
    let response = await transporter.sendMail(mailOption)
    res.status(200).send({message : "Email has sended succesfully", info : response})
  } catch (error) {
    res.send({message : "Something went wrong", error : error})
  }
})

