const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev': return {
            bd_string: 'mongodb+srv://user_admin:masterkey@clusterapi.9s8fm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pwd: 'userapimongodb',
            jwt_expiresIn: '24h'
        }
        case 'hml': return {
            bd_string: 'mongodb+srv://user_admin:masterkey@clusterapi.9s8fm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pwd: 'userapimongodb',
            jwt_expiresIn: '24h'
        }
        case 'prod': return {
            bd_string: 'mongodb+srv://user_admin:masterkey@clusterapi.9s8fm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pwd: 'userapimongodb',
            jwt_expiresIn: '24h'
        }
    }
}

console.log("Iniciando a API em ambiente " + env.toUpperCase());

module.exports = config();