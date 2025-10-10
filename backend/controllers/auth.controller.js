import { User } from "../Models/Auth.Schema.js"
import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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
      console.log(error)
      res.status(400).json({ error })

      return
    }
      const existingEmail = await User.findOne({email})
      if(existingEmail){
        return res.status(400).json({error:'email already exists'})
      }

      
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const storeUser = await User.create({ name, email, password: hashedPassword })
    res.status(200).json({ success: 'signed up successfully' })

  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' })
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
         res.status(200).json({success:'logged in successfully'})
         return

      }
      else{
       res.status(400).json({error:'incorrect password'}) 
      }
    }

    else{
      res.status(400).json({error:'incorrect email'})
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' })
    console.log(error)

  }
}


