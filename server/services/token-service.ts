// server/services/token-service.ts
import jwt from 'jsonwebtoken'
import tokenModel  from '../models/Token'
import type  {IUserDto}  from '~/types/auth.type'

const accessSecret = process.env.JWT_ACCESS_SECRET || 'default_secret';
const refreshSecret = process.env.JWT_ACCESS_SECRET || 'default_secret';

const TokenService = {

  generateTokens (payload: IUserDto){
    const accessToken = jwt.sign(payload, accessSecret, {expiresIn: '1d'})
    const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  },

  validateAccessToken(token: string) {
    try{
      let decodated = jwt.verify(token, accessSecret)
      if (typeof decodated === 'string') {
        throw new Error('Invalid token');
      }
      return decodated.id
    } catch (error) {
      console.log('validateAccessToken() invalid')
      return null
    }
  },

  validateRefreshToken(refreshToken: string) {
    try{
      return jwt.verify(refreshToken, refreshSecret)
    }catch (error) {
      console.log('validateRefreshToken() invalid')
      return false
    }
  },

  async findToken (refreshToken: string) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
  },

  async saveToken (userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({user: userId})
    if(tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  },

  async removeToken (refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  },
}

export default TokenService