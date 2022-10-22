const http = require("http")
const fs = require('fs').promises

const host = 'localhost'
const port = 8000
let indexFile, aboutFile, contactFile

const requestListener = function(req, res) {

    res.setHeader('Content-Type', 'text/html')
    switch (req.url) {
        case '/':
            res.writeHead(200)
            res.end(indexFile)
            break

        case '/home':
            res.writeHead(200)
            res.end(indexFile)
            break

        case '/about':
            res.writeHead(200)
            res.end(aboutFile)
            break

        case '/contact':
            res.writeHead(200)
            res.end(contactFile)
            break

        default:
            res.writeHead(404)
            res.end(`<html><body><h1>Error 404:</h1><p>The page you requested was not found</p></body></html>`)
    }
}

const server = http.createServer(requestListener)
async function run() {
    try {
        let indexResponse = await fs.readFile(__dirname + '/index.html')
        let aboutResponse = await fs.readFile(__dirname + '/about.html')
        let contactResponse = await fs.readFile(__dirname + '/contact.html')
        indexFile = indexResponse
        aboutFile = aboutResponse
        contactFile = contactResponse
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
        })
    } catch (error) {
        console.error(`Could not read requested file: ${error}`)
        process.exit(1)
    }
}

run()