const express=require("express")
const {graphqlHTTP}=require("express-graphql")
const{buildSchema}=require("graphql")
const { default: mongoose } = require("mongoose")
const app=express()
const userModel=require('./models/user')

mongoose.connect('mongodb://localhost:27017/test')
.then(()=>console.log("ok"))
.catch((err)=>console.log(err))
mongoose.Promise= global.Promise;


let schema=buildSchema(`
    type Query{
        AllUser(page: Int , limit: Int): UserResult
        user(country: String) : [user]
        hello : String
    },
    type UserResult{
        paginate:paginate
        User:[user]
    },
    type paginate{
        total : Int
        limit : Int
        page : Int
        pages : Int
    }
    type user{
        name : String 
        email : String 
        numberrange :Int
        phone :String
        country : String
    }
`)

let resolver = {
    hello : ()=>{
        return "hello mohmmad"
    },
    AllUser : async(args)=> {
        let page=args.page || 1 ;
        let limit=args.limit || 5 ;
        let users=await userModel.paginate({},{page,limit})
        return{
            User:users.docs,
            paginate:{
                total:users.total,
                limit:users.limit,
                page:users.page,
                pages:users.pages
            }
        }
    },
    user : async(arg)=> await userModel.find(arg)
}

app.use("/",graphqlHTTP({
    schema : schema,
    rootValue : resolver,
    graphiql : true
}))

app.listen(3000,()=>console.log("app running"))
