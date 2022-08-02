var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var uniqid = require('uniqid');
const speech = require('@google-cloud/speech');

const fs = require('fs');



var exerciceModel = require('../models/exercice');
var userModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercice', async function(req, res, next) {

    
  var result = await exerciceModel.find();
  

  res.json({ result: result });
});

router.post('/register', async function(req, res, next) {

  const hash = bcrypt.hashSync(req.body.password, 10);

  var newUser = new UserModel ({
    userName: req.body.userName,    
    email: req.body.email,
    password: hash,
    token: uid2(32)
   });

   var userSaved = newUser.save();
 

  res.json({ userSaved });
});

router.post('/upload/:langue', async function(req, res, next) {

    
    const audioPath = '/tmp/'+uniqid()+'.3gp'
    const file = await req.files.audio.mv(audioPath)
  
    
    
     let result = true
     let transcription = ''

     if (!file) {
       result = true
       const client = new speech.SpeechClient()
       const config = {
        encoding: 'AMR_WB',
        sampleRateHertz: 16000,
        languageCode: req.params.langue,
 
      };
      const audio = {
        content: fs.readFileSync(audioPath).toString('base64'),
       };
     
      const request = {
        config: config,
        audio: audio,
      };
    
      // Detects speech in the audio file
      const [response] = await client.recognize(request);
     
      transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
     
      console.log('Transcription: ', transcription);          
      
     }else{
       result = false
       
     }    
      
     fs.unlinkSync(audioPath); 

     res.json({ result: result, transcription: transcription});
  
});


module.exports = router;
