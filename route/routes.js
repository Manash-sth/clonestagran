const express = require('express')
const routes = express.Router()

const {upload} = require('../middleware/imageMW')
const {tokenverify} = require('../middleware/authMW')

const signup = require('../controller/signup_cont')
const login = require('../controller/login_cont')
const logout = require('../controller/logout_cont')
const newsfeed = require('../controller/newsfeed_cont')
const avatar = require('../controller/changeAvatar_cont')

const userverify = require('../controller/userVerify_cont')
const useractivate = require('../controller/userActivate_cont')

const changepass = require('../controller/changePassword_cont')
const uploadmed = require('../controller/upload')
const allpost = require('../controller/allpost_cont')

const like = require('../controller/like_cont')
const comment = require('../controller/comment_cont')
const bookmark = require('../controller/bookmark_cont')
const deletee = require('../controller/deletePost_cont')

const searchuser = require('../controller/searchUser_cont')
const followuser = require('../controller/followUser')
const unfollowuser = require('../controller/unfollowUser')

const getinf = require('../controller/getinf')
const getou = require('../controller/getou')

const forgotpass = require('../controller/forgotPassword_cont')
const otp = require('../controller/otp_cont')
const resetpass = require('../controller/reset_cont')


routes.post('/signup', signup.SignUp)
routes.post('/login', login.LogIn)
routes.put('/logout', logout.Logout)
routes.get('/newsfeed', newsfeed.Newsfeed)
routes.put('/avatar', upload.single('media'), avatar.Avatar)

routes.get('/emailconf/:token', userverify.UserEmailVerify)
routes.put('/useractivate', useractivate.UserActivate)

routes.put('/changepass', changepass.Changepassword)
routes.post('/upload', upload.single('media'), uploadmed.Upload)
routes.get('/allpost/:id', allpost.Allpost)

routes.put('/like/:pid', like.Like)
routes.put('/comment/:pid', comment.Comment)
routes.put('/bookmark/:pid', bookmark.Bookmark)
routes.delete('/delete/:pid', deletee.Delete)

routes.post('/search', searchuser.SearchUser)
routes.put('/follow/:id', followuser.FollowUSer)
routes.put('/unfollow/:id', unfollowuser.UnfollowUser)

routes.get('/getinf/:id', getinf.GetInf)
routes.get('/getou/:id', getou.GetOU)

routes.post('/forgotpass', forgotpass.ForgotPassword)
routes.post('/otp', otp.OTP)
routes.put('/resetpass/:token', resetpass.ResetPassword)

module.exports = routes