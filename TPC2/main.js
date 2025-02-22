const http = require("http");
const axios = require("axios");
const fs = require("fs");
const pages = require("./pages");

http.createServer(async (req, res) => {
    var d = new Date().toLocaleDateString("pt-PT");
    console.log(req.method + " " + req.url + " " + d);

    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(pages.genMainPage(d));
        res.end();
    }
    else if (req.url.match(/w3\.css$/)) {
        fs.readFile("w3.css", function(erro, dados) {
            if (erro) {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(dados);
            }
        });
    }
    else if (req.url == '/alunos') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        axios.get('http://localhost:3000/alunos')
        .then(resp => {
            res.write(pages.genAlunosTable(d, resp.data));
            res.end();
        })
        .catch(erro => {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
        });
    }
    else if (req.url.startsWith('/alunos/')) {
        var id = req.url.split('/')[2];
        axios.get('http://localhost:3000/alunos?id=' + id)
        .then(resp => {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(pages.genAlunoPage(resp.data[0], d));
            res.end();
        })
        .catch(erro => {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
        });
    }
    else if (req.url == '/cursos') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        axios.get('http://localhost:3000/cursos')
        .then(resp => {
            res.write(pages.genCursosTable(d, resp.data));
            res.end();
        });
    }
    else if (req.url.startsWith('/cursos/')) {
        var id = req.url.split('/')[2];
        try {
            const alunos = (await axios.get('http://localhost:3000/alunos?curso=' + id)).data;
            const curso = (await axios.get('http://localhost:3000/cursos?id=' + id)).data[0];
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(pages.genCursoPage(curso, d, alunos));
            res.end();
        } catch (erro) {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
        }
    }
    else if (req.url == '/instrumentos') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        axios.get('http://localhost:3000/instrumentos')
        .then(resp => {
            res.write(pages.genInstrumentosTable(d, resp.data));
            res.end();
        });
    }
    else if (req.url.startsWith('/instrumentos/')) {
        var id = req.url.split('/')[2];
        try {
            const instrumento = (await axios.get('http://localhost:3000/instrumentos?id=' + id)).data[0];
            const alunos = (await axios.get('http://localhost:3000/alunos?instrumento=' + instrumento["#text"])).data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(pages.genInstrumentoPage(instrumento, d, alunos));
            res.end();
        } catch (erro) {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<p>Operação não suportada: ' + req.url + '</p>');
    }
}).listen(4321);

console.log('Servidor à escuta na porta 4321...');
console.log('http://localhost:4321');