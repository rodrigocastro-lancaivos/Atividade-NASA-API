//precisa de tratamento para quando tiver entre 1 e 2 imagens para baixar ate o 3
var express = require('express');
var router = express.Router();
var axios = require('axios');
var fs = require('fs');
var path = require('path');
const { buscarApods } = require('../consumindoApod');
const { map } = require('../app');

var pasta = path.join(__dirname, "../public/images");


/* GET home page. */
router.get('/', async function(req, res, next) {
  var arquivos = fs.readdirSync(pasta);
  
  if (arquivos.length === 3) {
    return res.render('apod');
  } 
  
  else {
    var imagens = buscarApods();

    imagens.then(async (data) => {
      
      await Promise.all(data.map((item, index) => {
        const url = item.url;
        const nomeArquivo = `apod_${index + 1}.jpg`;
        const caminhoArquivo = path.join(pasta, nomeArquivo);
        

        return axios({
          method: 'get',
          url: url,
          responseType: 'stream'
        })
        .then(function (response) {
          response.data.pipe(fs.createWriteStream(caminhoArquivo));
        })
        .catch(function (error) {
          console.error('Erro ao baixar a imagem:', error);
        });

      }));

      res.render('apod');

    }).catch((error) => {
      console.error('Erro ao buscar APODs:', error);
    });
  }

});

module.exports = router;
