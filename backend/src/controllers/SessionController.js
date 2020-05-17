const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const id = req.body.id

        const ong =  await connection('ongs').where('id', id).select("*").first()

        if (!ong) {
            return res.status(400).json({error: 'No ong found with this ID'})
        }

        return res.status(200).json({name: ong.name})

    }
}