import { User } from "../Models/Auth.Schema.js"
import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {OAuth2Client} from 'google-auth-library'

dotenv.config()

const { gensalt } = pkg



// creating jwt 
const maxAge = 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  })
}

export const validationRules = [
  body('name').notEmpty().withMessage('name is required ').bail().isLength({ min: 3 }).withMessage('name should be atleast three characters long'),

  body('email').notEmpty().withMessage('email is required ').bail().isEmail().withMessage('Please enter a valid email address').bail().normalizeEmail(),

  body('password').notEmpty().withMessage('password is required').bail().isLength({ min: 3 }).withMessage('password must be 3 characters long')
]

//signup controller

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = errors.array().map(error => `${error.msg}`)

      // setTimeout(() => {
      return res.status(400).json({ error: error })
      // },2000);

    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      // setTimeout(() => {
      return res.status(400).json({ error: 'email already exists' })
      // }, 2000);
    }


    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const storeUser = await User.create({ name, email, password: hashedPassword })

    // setTimeout(() => {
    return res.status(200).json({ success: 'signed up successfully'})
    // }, 2000);

  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: 'Internal server error' })
    }, 2000);
    console.log(error)

  }
}



// login contoller


export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const findEmail = await User.findOne({ email })
    if (findEmail) {
      const findPassword = await bcrypt.compare(password, findEmail.password)
      if (findPassword) {
        const token = createToken(findEmail.id)
        res.cookie('userJWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ success: 'logged in successfully', token,userName:findEmail.name })
        return

      }
      else {
        res.status(400).json({ error: 'incorrect password' })
      }
    }

    else {
      res.status(400).json({ error: 'incorrect email' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' })
    console.log(error)

  }
}


// logout controller
export const logout = (req, res) => {
  try {

    res.cookie('userJWT', '', { maxAge: 0 })
    res.status(200).json({ success: 'logged out successfully' })


  } catch (error) {

    res.status(500).json({ error: 'Internal server error' })
    console.log(error)
    
  }
}




// login with google 



  export const googleLogin = async (req,res)  => {
    const oAuth2Client = new OAuth2Client();

    const {token} = req.body

    const result = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience:process.env.GOOGLE_CLIENT_ID,
    });


    const {name,email,picture} = result.payload
    console.log(name,email,picture)

     let user = await User.findOne({email})


     if (!user) {
      
        user = await User.create({
         name,
         email,
         password:null,
         picture
        })
        
      }

    const userToken = createToken(user._id)
    res.cookie('userJWT', userToken, { httpOnly: true, maxAge: maxAge * 1000 })


    res.status(201).json({success:'sign in successfully', userToken, user})


    if (result.payload['sub']) {
      console.log(`User id: ${result.payload['sub']}`);
    }

    // Optionally, if "includeEmail" was set in the token options, check if the
    // email was verified
    if (result.payload['email_verified']) {
      console.log(`Email verified: ${result.payload['email_verified']}`);
    }

    console.log('ID token verified.');
  }
