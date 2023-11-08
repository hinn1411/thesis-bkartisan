import mongoose from "mongoose";

async function dbconnect() {
    const URL: string = 'mongodb://0.0.0.0:27017/BKArtisan' ;

    try{
        await mongoose.connect(URL)
            .then(()=> console.log('DB Connected!!!'));
    }
    catch(error){
        console.log('Connect fail!!! ', error)
    }
}

export default dbconnect;