const http = require('http');
const axios = require('axios');

const API_URL = 'http://localhost:3000/reparacoes';
const API_URL_VIATURAS = 'http://localhost:3000/viaturas';

http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url === '/') {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<h1>Bem-vindo à Oficina</h1>');
                res.write("<button onclick=\"window.location.href='/reparacoes'\">Reparações</button>");
                res.write("<button onclick=\"window.location.href='/viaturas'\">Viaturas</button>");
                res.end();
            } else if (req.url === '/reparacoes') {
                axios.get(`${API_URL}?_sort=nome`)
                    .then(resp => {
                        const reparacoes = resp.data;
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>Reparações</h1><ul>');
                        res.write("<button onclick=\"window.location.href='/'\">Voltar</button><hr>");
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='/reparacoes/${element.id}'>${element.nome}</a></li>`);
                            res.write(`<p><strong>NIF:</strong> ${element.nif}</p><hr>`);
                        });
                        res.write('</ul>');
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>Erro interno do servidor</h1>');
                        res.end();
                    });
            } else if (req.url.match(/\/reparacoes\/\d+/)) {
                const id = req.url.split("/")[2];
                axios.get(`${API_URL}/${id}`)
                    .then(resp => {
                        const reparacao = resp.data;
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write(`<h1>${reparacao.id}</h1>`);
                        res.write(`<p><strong>Nome:</strong> ${reparacao.nome}</p>`);
                        res.write(`<p><strong>NIF:</strong> ${reparacao.nif}</p>`);
                        res.write(`<p><strong>Data:</strong> ${reparacao.data}</p>`);
                        res.write(`<p><strong>Marca:</strong> ${reparacao.viatura.marca}</p>`);
                        res.write(`<p><strong>Modelo:</strong> ${reparacao.viatura.modelo}</p>`);
                        res.write(`<p><strong>Matrícula:</strong> ${reparacao.viatura.matricula}</p>`);
                        res.write(`<p><strong>Número de Intervenções:</strong> ${reparacao.nr_intervencoes}</p>`);
                        res.write("<hr>");
                        res.write("<button onclick=\"window.location.href='/intervencoes/" + reparacao.id + "'\">Ver Intervenções</button>");
                        res.write("<button onclick=\"window.location.href='/'\">Voltar</button><hr>");
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>404 - Reparação não encontrada</h1>');
                        res.end();
                    });
            } else if (req.url.match(/\/intervencoes\/\d+/)) {
                const id = req.url.split("/")[2];
                axios.get(`${API_URL}/${id}`)
                    .then(resp => {
                        const reparacao = resp.data;
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write(`<h1>Intervenções da Reparação ${reparacao.id}</h1>`);
                        reparacao.intervencoes.forEach(intervencao => {
                            res.write(`<p><strong>Código:</strong> ${intervencao.codigo}</p>`);
                            res.write(`<p><strong>Nome:</strong> ${intervencao.nome}</p>`);
                            res.write(`<p><strong>Descrição:</strong> ${intervencao.descricao}</p>`);
                            res.write("<hr>");
                        });
                        res.write("<button onclick=\"window.location.href='/reparacoes/" + reparacao.id + "'\">Voltar</button>");
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>404 - Intervenções não encontradas</h1>');
                        res.end();
                    });
            }else if (req.url === '/viaturas') {
                axios.get(API_URL_VIATURAS)
                    .then(resp => {
                        const viaturas = resp.data;
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>Viaturas</h1><ul>');
                        res.write("<button onclick=\"window.location.href='/'\">Voltar</button><hr>");
                        viaturas.forEach(element => {
                            res.write(`<li>${element.matricula}</li>`);
                            res.write(`<p><strong>Marca:</strong> ${element.marca}</p>`);
                            res.write(`<p><strong>Modelo:</strong> ${element.modelo}</p><hr>`);
                        });
                        res.write('</ul>');
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>Erro interno do servidor</h1>');
                        res.end();
                    });
            }  else {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<h1>404 - Página não encontrada</h1>');
                res.end();
            }
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h1>405 - Método não permitido</h1>');
            res.end();
            break;
    }
}).listen(4321);

console.log(`Servidor a correr em http://localhost:4321`);
