import express from "express"
import {connect } from "mongoose"
import {MONGO, PORT} from "./config"
import {Items} from './models/shop-item'
import {Order} from './models/order'
import { Comments} from "./models/comments"



const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

connect(MONGO).then(() =>{
    console.log('Мы подключились')

}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err)
})

app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//отслеживаем адрес и на клиентской стороне получаем ответ
app.get('/api/cream-items', async (req, res) => {
    try {
        const getItems = await Items.find().sort({_id:1})
        if(!getItems) throw new Error("не найдены товары")
        res.status(200).send(getItems)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/cream-items/:id', async (req, res) => {
    try {
        const getItem = await Items.findOne({ id: req.params.id })
        console.log(getItem)
        if(!getItem) throw new Error("не найдены товары")

        res.status(200).send(getItem)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//отслеживание юрл адреса на стороне сервера

app.post('/api/cream-items', async (req, res) => {
    try {
        const result = await Order.insertMany(req.body)
        if(!result) throw new Error("товары не добавлены")
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// Маршрут для создания комментария
app.post('/api/comments', async (req, res) => {
    try {
        const result = await Comments.insertMany(req.body)
        if(!result) throw new Error("комменты не добавлены")
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});


// Маршрут для получения всех комментариев

app.get('/api/comments', async (req, res) => {
    try {
        const getItems = await Comments.find()
        console.log("хэээй",getItems)
        if (!getItems) throw new Error('Не найдены комменты')
        res.status(200).send(getItems)
    } catch (err) {
        console.log("плохаааааааааааа!")
        console.log(err)
        res.status(500).send(err)
    }
})




app.listen(PORT,() => console.log('сервер запущен'))

