var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Engenharia Web 2025',
    docente: 'jcr',
    instituicao: 'UMinho'
  });
});

router.get('/filmes', function(req, res, next) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      res.render('filmes', { lfilmes: resp.data, tit: "Lista de Filmes" });
    })
    .catch(err => {
      res.render('error', { error: err });
    });
});

router.get('/filmes/edit/:id', function(req, res, next) {
  let id = req.params.id;
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      res.render('edit', { filme: resp.data });
    })
    .catch(err => {
      console.error("Erro ao buscar filme:", err);
      res.render('error', { error: err });
    });
});

router.get('/filmes/autor/:nome', function(req, res) {
  let nome = req.params.nome;  
  axios.get('http://localhost:3000/filmes')  
    .then(resp => {
      const filmesDoAtor = resp.data.filter(filme => 
        filme.cast && filme.cast.some(ator => ator.toLowerCase().includes(nome.toLowerCase()))
      );

      res.render('ator', { 
        filmes: filmesDoAtor, // Alterado de "lfilmes" para "filmes" para corresponder ao template
        autor: nome // Alterado "tit" para "autor" para corresponder ao template
      });
    })
    .catch(err => {
      console.error("Erro ao buscar filmes:", err);
      res.render('error', { error: err });
    });
});

router.post('/filmes/update/:id', async (req, res) => {
  try {
    const filmeId = req.params.id;
    const { title, year, cast, genres } = req.body;

    const castArray = cast.split(',').map(s => s.trim()).filter(Boolean);
    const genresArray = genres.split(',').map(s => s.trim()).filter(Boolean);

    const updatedFilme = {
      title,
      year: parseInt(year),
      cast: castArray,
      genres: genresArray
    };

    await axios.put(`http://localhost:3000/filmes/${filmeId}`, updatedFilme);
    res.redirect('/filmes');
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).send('Erro ao atualizar o filme');
  }
});

router.get('/filmes/delete/:id', function(req, res) {
  axios.delete('http://localhost:3000/filmes/' + req.params.id)
    .then(() => res.redirect('/filmes')) // Simplificado o redirecionamento
    .catch(erro => {
      console.log(erro);
      res.render('error', { error: erro });
    });
});

module.exports = router;