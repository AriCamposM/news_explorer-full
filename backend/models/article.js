const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./user');

const articleSchema = new mongoose.Schema({
  keyword:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  date:{
    type:String,
    required:true,
  },
  source:{
    type:String,
    required:true,
  },
  url:{
    type:String,
    required:true,
    validate: validator.isURL,
    message: props => `${props.value} is not a valid URL !`,
  },
  urlToImage:{
    type:String,
    required:true,
    validate: validator.isURL,
    message: props => `${props.value} is not a valid URL !`,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    select:false
  }
})


module.exports = mongoose.model('Article', articleSchema);