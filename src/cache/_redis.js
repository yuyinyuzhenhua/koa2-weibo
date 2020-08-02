const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log('redis error', err);
})


function get(key, val, timeout = 60 * 60){
    if(typeof key === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}


/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 
 */
function set(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err){
                reject(err)
                return;
            }
            if(val === null){
                resolve(null)
                return;
            }
            try{
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise;
}

module.exports = {
    get, 
    set
}


