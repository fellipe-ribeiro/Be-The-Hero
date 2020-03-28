const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const count = await connection('incidents').count();
         
         const total = JSON.stringify(count);
         const totalc = total.replace( /\D/g, "");
         

         
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
         'incidents.*',
         'ongs.name', 'ongs.email',
         'ongs.whatsapp',
         'ongs.city',
         'ongs.uf'
        ]);
        
        response.header('X-Total-Count', totalc);

        return response.json(incidents);
    },



async create(request, response) {
    const {title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection.insert({
        title,
        description,
        value,
        ong_id,
    }).into('incidents');

    return response.json({ id });
},

async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection.select('ong_id').from('incidents').where('id',id).first();
    
    if (incident.ong_id != ong_id){
     
        return response.status(401).json({ error: 'Operation not permitted.' });
    }
    
    await connection.delete().from('incidents').where('id', id);

    return response.status(204).send();
}

};