const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
    async create(req, res) {
        // método criar ongs
        const {name, email, whatsapp, city, uf} = req.body
        const id = crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
        })
        .then(()=>{
            return res.json({id:id})
        })
        .catch((err)=>{
            console.log(res.json({msg:err}))
        })
    },
    async list(req, res) {
        // método listar ongs
        const ongs = await connection('ongs').select("*")
        return res.json(ongs)
    },
    async delete(req, res){
        // metodo delete ongs
        const ong = await connection('ongs').where('id', req.params.id).select("*").first()

        if (!ong) {
            res.status(400).json({error: "Ong does not exist"})
        }

        await connection('ongs').where('id', req.params.id).delete()
        res.status(204).send()
    },
    async update(req, res){
        data = req.body
        await connection('ongs').where('id', req.params.id).update({
            "name":data.name,
            "email":data.email,
            "whatsapp":data.whatsapp,
            "city":data.city,
            "uf": data.uf
        })
            .then(()=>{
                return res.json(data)
            })
            .catch((err)=>{
                console.log(res.json({msg:err}))
            })
    }
}