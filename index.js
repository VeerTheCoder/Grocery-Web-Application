const express=require("express");
const customer=require('./mongoose');
const path=require('path');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set('view engine','ejs');

app.get("/",(_,resp)=>{
    resp.render("signup");
});
app.post('/register',async (req,resp)=>{
        const password=req.body.password;
        const cpassword=req.body.cpassword;
        const inputted_email=req.body.email;
        const inputted_phone=req.body.phone_no;
        const dbdata=await customer.findOne({$or:[{email:inputted_email},{phone:inputted_phone}]}); 
        if(dbdata!=null){
            resp.render("alreadyregister")
            app.post('/aregister',(_,resp)=>{
                    resp.render("login");
            });               
        }
        else if(password===cpassword){
            const rnow=new customer({
                name:req.body.name,
                email:inputted_email,
                phone:inputted_phone,
                city_name:req.body.city,
                gender:req.body.gender,
                password:password,
                cpassword:cpassword
            });
            await rnow.save();
            resp.render("success");
            app.post('/success',(_,resp)=>{
                resp.render('login');
            });
        }
        else{
            resp.send("Password mismatch");
        }
       
});


app.get('/login',(_,resp)=>{
    resp.render('login');
})


app.post('/login',async (req,resp)=>{
    const email=req.body.email;
    const pass=req.body.password;
    const res=await customer.findOne({email:email});
    if(res.password===pass){
        resp.render("index",{res});
        //for log Out
        app.post('/checkout',(_,resp)=>{
            resp.render('login');
        })
    }
    else {
        resp.send("Invalid email or password");
    }

});

app.get('*',(_,resp)=>{
    resp.render('404');
})

app.listen(5000);