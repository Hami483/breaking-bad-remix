import User from '~/utils/userModel.server'
import Comment from '~/utils/commentsModel.server'
import dbConnect from './dbConnect.server'
import bcrypt from 'bcrypt'

export async function register(name,email,password){
    dbConnect()
    try {

        const checkUnique = await User.findOne({email}).exec()

        if(checkUnique){
            throw new Error('Email is Already in use')
        }
        const hashPassword = await bcrypt.hash(password,8)


        const nUser = {
            name,
            email,
            password: hashPassword
        }

        const newUser = await new User(nUser).save()

        const userDoc = newUser._doc;

        delete userDoc.password;


        return userDoc;

    } catch (error) {
        console.log('register error',error)
    }
}

export async function login(email,password){
    dbConnect()

    try {
        const user = await User.findOne({email}).exec()

        if(!user){
             return null
         }

         const userDoc = user._doc

         const isMatched = await bcrypt.compare(password,userDoc.password)

         if(user && isMatched){
             
            delete userDoc.password

            return userDoc
         }else{
             return null;
         }


    } catch (error) {
        console.log('login error',error)
    }
}

export async function getUser(id){
    dbConnect()

    try {
        const user = await User.findById(id);

        if(!user){
             return null
         }

         const userDoc = user._doc
        delete userDoc.password
        return userDoc
         
    } catch (error) {
        console.log('get user error',error)
    }
}

export async function createOrUpdateUser (name,email) {
    const user = await User.findOneAndUpdate(
    { email },
    { name: name },
    { new: true }
  );
  if (user) {
   
    return user;
  } else {
    const newUser = await new User({
      email,
      name:name,
    }).save();
   
    return newUser;
  }
}