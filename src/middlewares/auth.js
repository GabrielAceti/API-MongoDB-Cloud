const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header) return res.status(511).json({error: "Autenticação recusada!"});

    jwt.verify(token_header, 'userapimongodb', (err, decoded) => {
        if(err) return res.status(511).json({error: "Token inválido"});
        return next();
    });
}

module.exports = auth;