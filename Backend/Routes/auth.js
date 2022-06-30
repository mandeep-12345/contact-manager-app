const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth=require("../middlewares/auth")
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    // check all the missing fields.
    if (!name || !email || !password) {
        return res.status(400).json({ error: "please enter all the required fields" })
    }
    //name validation
    if (name.length > 25) {
        return res.status(400).json({ error: "name can only be less than 25 characters" })
    }
    //email validation
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "please enter valid email id " })
    }
    //password validation
    if (password.length <= 6) {
        return res.status(400).json({ error: "password must be atleast 6 characters long" })
    }
    try {
        const ifUserAlreadyExists = await User.findOne({ email })
        if (ifUserAlreadyExists) {
            return res.status(400).json({ error: `A user with the ${email} already exists,so please try another email id` })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashedPassword })
        //save the user
        const result = await newUser.save()
        result._doc.password = undefined
        return res.status(200).json({ ...result._doc })


    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })

    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "please enter all the required fields" })
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "please enter valid email id " })
    }
    try {
        const doesUserExists = await User.findOne({ email })
        if (!doesUserExists) {
            return res.status(400).json({ error: "invalid email id or password" })

        }
        //if there is a user
        const doesPasswordMatch = await bcrypt.compare(password, doesUserExists.password)
        if (!doesPasswordMatch) {
            return res.status(400).json({ error: "invalid email id or password" })
        }
        const payload = { _id: doesUserExists._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        const user = { ...doesUserExists._doc, password: undefined }
        return res.status(200).json({ token ,user})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });

    }

})
router.get("/me",auth,async(req,res)=>{
    return res.status(200).json({...req.user._doc})
})

module.exports = router