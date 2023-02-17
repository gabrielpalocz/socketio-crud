const pool = require("../db");

var Users = {

    //------------------ [ CRUD ] --------------------//

    //GET
    getAllU: function (callback) {
        pool.query('SELECT * FROM usuarios ORDER BY id ASC', function (err, result) {
            if (err) throw err;
            //console.log(result.rows)
            callback(JSON.stringify(result.rows));
        }
        );
    },

    getU: function (id, callback) {
        console.log(id)
        pool.query('SELECT * FROM usuarios WHERE id = $1', [id], function (err, result) {
            if (err) throw err;
            //console.log(result.rows)
            callback(JSON.stringify(result.rows));
        }
        );
    },

    //POST
    addIdU: function (data, callback) {
        console.log(data)
        pool.query("INSERT INTO usuarios (id, nombre) values ($1, $2) RETURNING *", [data.id, data.name], function (err, result) {
            if (err) throw err;
            console.log(result.rows)
            callback({
                status: "ok"
            });
        }
        );
    },
    addIdU2: function (data, callback) {
        console.log(data)
        pool.query("INSERT INTO usuarios (id, nombre) values ($1, $2) RETURNING *", [data.id, data.nombre], function (err, result) {
            if (err) throw err;
            console.log(result.rows)
            callback({
                status: "ok"
            });
        }
        );
    },
    addU: function (data, callback) {
        console.log(data)
        pool.query("INSERT INTO usuarios (nombre) values ($1) RETURNING *", [data.name], function (err, result) {
            if (err) throw err;
            console.log(result.rows)
            callback({
                status: "ok"
            });
        }
        );
    },

    //PUT
    editU: function (id, data, callback) {
        console.log(id)
        console.log(data)
        pool.query("UPDATE usuarios SET nombre = $1 where id = $2 RETURNING *", [data.name, id], function (err, result) {
            if (err) throw err;
            //console.log(result.rows)
            callback({
                status: "ok"
            });
        }
        );
    },

    //DELETE
    deleteU: function (id, callback) {
        console.log(id)
        pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id], function (err, result) {
            if (err) throw err;
            //console.log(result.rows)
            callback({
                status: "ok"
            });
        }
        );
    },


    //prueba de envio
    getAllUEN: function (callback) {
        pool.query('SELECT * FROM usuarios ORDER BY id ASC', function (err, result) {
            if (err) throw err;
            //console.log(result.rows)
            callback(JSON.stringify(result.rows));

        }
        );
    },

};


module.exports = Users;