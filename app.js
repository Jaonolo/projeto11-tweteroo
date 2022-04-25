import express from "express";
import cors from "cors"

const PORT = 5000

const users = []
const tweets = []

const app = express()
app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
    let {username, avatar} = req.body

    if(username === undefined || avatar === undefined) {
        res
            .status(400)
            .send("Todos os campos são obrigatórios!")
        return
    }

    users.push({
        username: username,
        avatar: avatar
    })
    res
        .status(201)
        .send("OK")
})

app.post("/tweets", (req, res) => {
    let username = req.headers.user
    let { tweet } = req.body
    
    if(username === undefined || tweet === undefined) {
        res
            .status(400)
            .send("Todos os campos são obrigatórios!")
        return
    }

    let user = users.find(e => e.username === username)
    user = user || {avatar: ''}
    tweets.push({
        username: username,
        avatar: user.avatar,
        tweet: tweet
    })
    res
        .status(201)
        .send("OK")
})

app.get("/tweets", (req, res) => {
    let page = req.query.page
    if(page < 1) {
        res
            .status(400)
            .send("Informe uma página válida!")
            return
    }
    page = page || 1

    let lastTweets = []
    let pageStart = tweets.length - (page - 1)*10 - 1
    for(let i = pageStart; i >= 0 && i > pageStart - 10; i--)
        lastTweets.push(tweets[i])
    res.send(lastTweets)
})

app.get("/tweets/:username", (req, res) => {
    let { username } = req.params
    res.send(tweets.filter(e => e.username === username))
})

app.get("/", (req, res) => res.send("Servidor funcionando!"))

app.listen(PORT, () => console.log(`Servidor de pé e escutando na porta ${PORT}`))