// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body)); // Converte os dados do formulário em um objeto
        });
    } else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if (req.url === "/alunos" || req.url === "/" ){
                    axios.get('http://localhost:3000/alunos')
                        .then(resp => {
                            data = resp.data
                            res.writeHead(200,{'content-Type' : 'text/html, charset=utf-8'})
                            res.write(templates.studentsListPage(data,d))
                            res.end()
                        })
                        .catch( err => {
                            console.log(err)
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.errorPage("Erro ao obter a lista de alunos.", d));
                            res.end();
                        })
                }


                // GET /alunos/:id --------------------------------------------------------------------
                else if ( req.url.match(/\/alunos\/[A-Za-z0-9%]+$/)){
                    let id = req.url.split('/')[2];
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(response => {
                            var aluno = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.studentPage(aluno, d));
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("O Aluno " + id + " não foi encontrado.", d));
                            res.end();
                        });
                }



                // GET /alunos/registo --------------------------------------------------------------------
               
                else if (req.url === "/alunos/registo") {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.studentFormPage(d));
                    res.end();
                }


                // GET /alunos/edit/:id -------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3];
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(response => {
                            var aluno = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.studentFormEditPage(aluno, d));
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("O Aluno " + id + " não foi encontrado para editar.", d));
                            res.end();
                        });
                }
               
                /// GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3]; // Extrai o ID da URL
                
                    // Envia a requisição de delete para o backend
                    axios.delete('http://localhost:3000/alunos/' + id)
                        .then(response => {
                            res.writeHead(302, { 'Location': '/alunos' }); // Redireciona para a lista de alunos
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(templates.errorPage("O Aluno " + id + " não foi encontrado para remover.", d));
                            res.end();
                        });
                }

                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.errorPage("Erro 404: Page not found.", d));
                    res.end();
                }
                break;
                
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url === "/alunos/registo") {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            // Envia os dados para o backend
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(302, { 'Location': '/alunos' }); // Redireciona para a lista de alunos
                                    res.end();
                                })
                                .catch(err => {
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.write(templates.errorPage("Erro ao cadastrar aluno.", d));
                                    res.end();
                                });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(templates.errorPage("Dados inválidos para cadastro.", d));
                            res.end();
                        }
                    });
                }

                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3]; // Extrai o ID da URL
            
                    collectRequestBodyData(req, result => {
                        if (result) {
                            // Envia os dados para o backend
                            axios.put('http://localhost:3000/alunos/' + id, result)
                                .then(resp => {
                                    res.writeHead(302, { 'Location': '/alunos' }); // Redireciona para a lista de alunos
                                    res.end();
                                })
                                .catch(err => {
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.write(templates.errorPage("Erro ao atualizar aluno.", d));
                                    res.end();
                                });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(templates.errorPage("Dados inválidos para atualização.", d));
                            res.end();
                        }
                    });
                }
                break;


                // PUT /alunos/:id
            case "PUT":
                    if (req.url.match(/\/alunos\/[A-Za-z0-9%]+$/)) {
                        let id = req.url.split('/')[2]; // Extrai o ID da URL
                
                        collectRequestBodyData(req, result => {
                            if (result) {
                                // Atualiza os dados do aluno
                                axios.put('http://localhost:3000/alunos/' + id, result)
                                    .then(resp => {
                                        res.writeHead(302, { 'Location': '/alunos' }); // Redireciona para a lista de alunos
                                        res.end();
                                    })
                                    .catch(err => {
                                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                        res.write(templates.errorPage("Erro ao atualizar aluno.", d));
                                        res.end();
                                    });
                            } else {
                                res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write(templates.errorPage("Dados inválidos para atualização.", d));
                                res.end();
                            }
                        });
                    }
                    break;
                

              
                case "DELETE":
                    if (req.url.match(/\/alunos\/[A-Za-z0-9%]+$/)) {
                        let id = req.url.split('/')[2]; // Extrai o ID da URL
                
                        axios.delete('http://localhost:3000/alunos/' + id)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write(templates.successPage("Aluno removido com sucesso!", d));
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write(templates.errorPage("Erro ao remover aluno.", d));
                                res.end();
                            });
                    }
                    break;
                    
                
                
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.errorPage("Erro 405: Método não permitido.", d));
                res.end();
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
    console.log('http://localhost:7777');
})



