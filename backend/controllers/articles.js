const Article = require('../models/article');


module.exports.getArticles = ( req, res ) =>{
  const user = req.user._id;
  Article.find({ owner: user })
  .then( articles => res.json(articles))
  .catch( (err) => res.status(500).send({ message:`Error Getting News Articles `}));
}

module.exports.postArticle = ( req, res) => {

  const { keyword, title, description, date, source, url, urlToImage } = req.body;
  const owner = req.user._id;
  Article.create({ keyword, title, description, date, source, url, urlToImage, owner })
  .then( article => res.status(201).json(article))
  .catch((err) => res.status(500).send({ message:'Error creating Article in Favorites', error: err.message}));
}

module.exports.deleteArticle = ( req, res) => {
  const user = req.user._id;
  const articleId = req.params.articleId;

  Article.findById(articleId)
  .select('+owner')
  .then((article) => {
    if(!article){
      return res.status(404).send({ message: 'Article not found'})
    }
    
    if(article.owner.toString() !== user.toString()){
      return res.status(403).send({ message: 'You do not have permission to delete this card.' });
    }


    return Article.findByIdAndDelete(articleId);
  })
  .then( () => {
    res.send({ message: 'Card Deleted Sucessfully From Favorites'});
  })
  .catch((err) => res.status(500).send({ message:'Error deleting Article from Favorites ', error: err.message }))
}