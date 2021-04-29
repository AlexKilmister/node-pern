const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign({id: id, email, role}, process.env.SEKRET_KEY, {expiresIn: '24h'})
}

class UserController {
  async registration (req, res, next) {
    const {email, password, role} = req.body
    if (!email || !password) next(ApiError.badRequest('Некорректный email или пароль'))
    const candidate = await User.findOne({where: {email}})
    if (candidate) next(ApiError.badRequest('Пользователь с таким email уже существует'))
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword})
    const basket = await Basket.create({userId: user.id})
    const token = generateJwt(user.id, user.email, user.role)

    return res.json({token})
  }

  async login (req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) next(ApiError.internal('Пользователь не найден'))
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) next(ApiError.internal('Неправильный пароль'))
    const token = generateJwt(user.id, user.email, user.role)

    return res.json({token})
  }

  async check (req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()
