const bcrypt = require("bcryptjs");
const Secret = require("../models/secrets");

const googlekey="erhmmmmmmmmmmmm NO :)";
helper.readKey("ggk",googlekey);
const saltRounds = 10;

function readKey(name,key) {
    if (name == null || key == null) {
        console.log(`helper error`)
        return 1
    } else {
        Secret.findOne({ "key.name": name })
        .then(data => {
            const val = data.val
                      console.log(val)        
            if (!data) {
                console.log(`Adding ${name} to secret store:`)
    
                // encrypt key
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(key, salt, (err, hash) => {
                        Secret.create({
                           key: {
                               name: name,
                               value: hash
                           } 
                        })
                        .then(data => {
                            console.log(`${name} was added to mongodb`)
                        })
                        .catch(err => {
                            console.log(err => console.log(err))
                        })                                    
                    });
                });
                     
            } else {
    
                console.log(`Retriving ${name} from mongodb`)  
                
                // check password(plain) against user.password(hash)
                bcrypt.compare(key, val, function(err, res) {
                    if (res) {
                        console.log(res) 
                        
                    } else {
                        console.log(`No the same`) 
                       
                    }
                });
            }                         
        })
    }
}





module.exports = {
    readKey: readKey
}
