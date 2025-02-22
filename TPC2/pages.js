export function genMainPage(data) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Escola de Música</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li><a href="/alunos">Lista de Alunos</a></li>
                        <li><a href="/cursos">Lista de Cursos</a></li>
                        <li><a href="/instrumentos">Lista de Instrumentos</a></li>
                    </ul>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genAlunosTable(data, alunos) {
    const tableContent = `
        <table class="w3-table-all w3-card-4">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Curso</th>
            </tr>
            ${alunos.map(a => `
                <tr>
                    <td>${a.id}</td>
                    <td><a href="/alunos/${a.id}">${a.nome}</a></td>
                    <td>${a.curso}</td>
                </tr>
            `).join('')}
        </table>
    `;

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Tabela de Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Tabela de Alunos</h1>
                </header>
                <div class="w3-container">
                    ${tableContent}
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genAlunoPage(aluno, data) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Aluno ${aluno.id}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Aluno ${aluno.id}</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>ID: ${aluno.id}</li>
                        <li>Nome: ${aluno.nome}</li>
                        <li>Data de Nascimento: ${aluno.dataNasc}</li>
                        <li>Curso: ${aluno.curso}</li>
                        <li>Ano de Curso: ${aluno.anoCurso}</li>
                        <li>Instrumento: ${aluno.instrumento}</li>
                    </ul>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genCursosTable(data, cursos) {
    const tableContent = `
        <table class="w3-table-all w3-card-4">
            <tr>
                <th>ID</th>
                <th>Designação</th>
                <th>Duração</th>
                <th>Instrumento</th>
            </tr>
            ${cursos.map(c => `
                <tr>
                    <td>${c.id}</td>
                    <td><a href="/cursos/${c.id}">${c.designacao}</a></td>
                    <td>${c.duracao} anos</td>
                    <td>${c.instrumento["#text"]}</td>
                </tr>
            `).join('')}
        </table>
    `;

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Tabela de Cursos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Tabela de Cursos</h1>
                </header>
                <div class="w3-container">
                    ${tableContent}
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genCursoPage(curso, data, alunos) {
    const tableContent = `
        <table class="w3-table-all w3-card-4">
            <tr><th>Aluno</th></tr>
            ${alunos.map(a => `<tr><td>${a.nome}</td></tr>`).join('')}
        </table>
    `;

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>${curso.designacao}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>${curso.designacao}</h1>
                </header>
                <div class="w3-container">
                    ${tableContent}
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genInstrumentosTable(data, instrumentos) {
    const tableContent = `
        <table class="w3-table-all w3-card-4">
            <tr>
                <th>ID</th>
                <th>Designação</th>
            </tr>
            ${instrumentos.map(i => `
                <tr>
                    <td>${i.id}</td>
                    <td><a href="/instrumentos/${i.id}">${i["#text"]}</a></td>
                </tr>
            `).join('')}
        </table>
    `;

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Tabela de Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Tabela de Instrumentos</h1>
                </header>
                <div class="w3-container">
                    ${tableContent}
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in  ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}
export function genInstrumentoPage(instrumento, data, alunos) {
    const tableContent = `
        <table class="w3-table-all w3-card-4">
            <tr><th>Aluno</th></tr>
            ${alunos.map(a => `<tr><td>${a.nome}</td></tr>`).join('')}
        </table>
    `;

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>${instrumento["#text"]}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>${instrumento["#text"]}</h1>
                </header>
                <div class="w3-container">
                    ${tableContent}
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-black w3-round w3-hover-light-black"> Voltar</a>
                </div>
                <footer class="w3-container w3-orange">
                    <h5>Generated in  ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `;
}