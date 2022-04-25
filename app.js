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
    users.push({
        username: username,
        avatar: avatar
    })
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    let {username, tweet} = req.body
    let user = users.find(e => e.username === username)
    user = user || {avatar: ''}
    tweets.push({
        username: username,
        avatar: user.avatar,
        tweet: tweet
    })
    res.send("OK")
})

app.get("/tweets", (req, res) => {
    let lastTweets = []
    for(let i = tweets.length - 1; i >= 0 && i >= tweets.length - 10; i--)
        lastTweets.push(tweets[i])
    res.send(lastTweets)
})

app.get("/", (req, res) => res.send("Servidor funcionando!"))

app.listen(PORT, () => console.log(`Servidor de pé e escutando na porta ${PORT}`))