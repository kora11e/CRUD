const express = require('express')
const path = require('path')
const model = require('../models/modele')

const router = express.Router()

router.get('/', async (req,res)=> {
    try {
        res.status(201).sendFile(path.resolve(__dirname,'../views/index.html'))
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})
router.post('/', async (req,res) => {
    let newVtuber = new model({
        nazwa: req.body.nazwa,
        suby: req.body.suby
    })
    try {
        const newlyVtuber = await newVtuber.save()
        res.status(201).json(newlyVtuber)
    } catch (error) {
        res.status(400).json({message:err.message})
    }
})
router.get('/all', async (req,res) => {
    model.find({}, (err, lista) => {
        res.render('index', {
            ListaVT:lista
        })
    })
})
router.get('/:id', getVT, async (req,res)=> {
    res.send(req.VTuber.nazwa)
})
router.patch('/:id', getVT, async (req,res)=> {
    if (req.body.nazwa != null) {
        res.VTuber.nazwa = req.body.nazwa
    }
    if (req.body.suby != null) {
        res.VTuber.suby = req.body.suby
    }
    try {
        const updatedVTuber = await res.VTuber.save()
        res.json(updatedVTuber)
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
})
router.delete('/:id', getVT, async (req,res)=> {
    try {
        await res.VTuber.remove()
        res.json({message: 'Usunięto użytkownika'})
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})

async function getVT(req,res,next) {
    let VTuber
    try {
        VTuber = await model.findById(req.params.id)
        if (VTuber === null) {
            return res.status(404).json({message: 'Nie można znaleźć strony'})
        }
    } catch (error) {
        return re.status(500).json({message: err.message})
    }
    res.VTuber = VTuber
    next()
}

module.exports = router