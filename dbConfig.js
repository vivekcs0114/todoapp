var mongoose = require('mongoose');
var confData={
    port:3000,
    db:'mongodb://root:root@ds115870.mlab.com:15870/twitthere'
}
module.exports=confData;

var Schema = mongoose.Schema;
var Task = new Schema({
    title : String,
    status : String
});