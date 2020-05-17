const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const data = req.body
        const id = req.headers.authorization

        await connection('incidents').insert({
            "title": data.title,
            "value":data.value,
            "description":data.description,
            "ong_id": id
        })
        return res.json({data: data, ong_id: id})
    },
    async update(req, res){

    },
    async delete(req, res){
        const id = req.params.id
        const ong_id = req.headers.authorization

        const incident = await connection('incidents').where({'id':id, 'ong_id':ong_id}).select("*").first()

        if (incident.length < 1){
            return res.status(401).json({error:'Not Authorized'})
        }

        await connection('incidents').where('id', id).delete()
        return res.status(204).send()
        
    },
    async list(req, res){
        const {page = 1} = req.query
        //limita 5 resultados por vez, offset é o intervalo entre os resultados
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        const [count] = await connection('incidents').count() // conta a quantidade de registros 

        res.header('X-TOTAL-COUNT', count['count(*)'])
        return res.json(incidents)

    }
}