const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

//dados do clima de tres cidades
const previsaoTempo = [
    { id: 1, cidade: "São Paulo", temperatura: "24°C", condicao: "Nublado" },
    { id: 2, cidade: "Rio de Janeiro", temperatura: "32°C", condicao: "Ensolarado" },
    { id: 3, cidade: "Curitiba", temperatura: "15°C", condicao: "Chuvoso" }
];

//essa é a rota 1 onde fica a pagina inicial
const server = http.createServer((req, res) => {
    console.log(`Tentando acessar: ${req.url}`.blue);

    if (req.url === '/') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.log(`Erro ao ler index.html: ${err}`.red);
                res.writeHead(500);
                res.end('Erro: Não achei o index.html na pasta public!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
    
    //rota 2 API
    else if (req.url === '/api/clima') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(previsaoTempo));
    }
    
    //rota 3 erro 404, responsavel pela pagina do erro 404
    else {
        const file404 = path.join(__dirname, 'public', '404.html');

        fs.readFile(file404, 'utf8', (err, content) => {
            if (err) {
                console.log(`Erro ao ler 404.html: ${err}`.red);
                res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(`Erro! O servidor tentou ler o arquivo aqui: ${file404} e não conseguiu.`);
            } else {
                console.log('Arquivo 404.html carregado com sucesso!'.white);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`--- Servidor Reiniciado ---`.yellow);
    console.log(`Rodando em http://localhost:${PORT}`.cyan);
});