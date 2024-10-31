  const mongoose = require('mongoose');
  const validator = require('validator');
  const bcrypt = require('bcryptjs')


  const userSchema = new mongoose.Schema({
    email:{
      type: String,
      unique:true,
      required:true,
      lowercase:true,
      validate: validator.isEmail,
      message: props => `${props.value} is not a valid email !`
    },
    password:{
      type: String,
      required:true,
      minlength: 8,
      select:false,
    },
    name:{
      type: String,
      required:true,
      minlength: 2,
      maxlength:30,
    }
  })

  userSchema.statics.userFinderByCredentials = function userFinderByCredentials ( email, password){
    return this.findOne({email}).select("+password")
    .then((user) => {
      if (!user){
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password , user.password)
        .then((matched) => {
          if(!matched){
            return Promise.reject(new Error('Incorrect email or password'))
          }

          return user;
        });
    });
  };


  module.exports = mongoose.model( 'User', userSchema);