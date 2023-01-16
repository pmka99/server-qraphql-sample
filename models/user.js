const mongoose= require("mongoose");
const mongoosePaginate= require("mongoose-paginate")

const userSchema= new mongoose.Schema({
    name : {type : String ,required : true},
    phone : {type : String , required :false},
    email : {type : String , required :true},
    address : {type : String ,required :false},
    country  : {type : String ,required :true},
    numberrange : {type : Number ,required :true}
})


userSchema.plugin(mongoosePaginate)

module.exports= mongoose.model('user',userSchema,'user')



