const cheerio = require('cheerio');
const request = require('request');


module.exports = { 
  async scrapeSite(req, res) {
    try {
      let url = req.body.url
      let recipes;
      request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          let recipeName;
          let prepTime;
          let cookTime;
          let description;
          let ingredients = []
          let instructions = []

          //simplyrecipes.com
          if (url.includes('simplyrecipes.com')) {
            recipeName = $('.entry-title').text()
            prepTime = $('.preptime').text()
            cookTime = $('.cooktime').text()
            description = $('.meta-description-content').text()
    
            $('.recipe-ingredients li').each((i, el) => {
              let item = $(el).text()
              ingredients.push(item.replace('▢ ',''))
            }) 
    
            $('.recipe-method p').each((i, el) => {
              let item = $(el).text()
              if (!isNaN(item.charAt(0))) {
                item = item.substring(1)
              }
              if (!isNaN(item.charAt(0))) {
                item = item.substring(1)
              } 
              if (item !== '') {
                instructions.push(item)
              }
            }) 
          }

          //sallysbakingaddiction.com
          if (url.includes('sallysbakingaddiction.com')) {
            recipeName = $('.tasty-recipes-header-content').find('h2').text()
            prepTime = $('.tasty-recipes-prep-time').text()
            cookTime = $('.tasty-recipes-cook-time').text()
            description = $('.tasty-recipes-description-body').find('p').text()

            $('.tasty-recipes-ingredients-body li').each((i, el) => {
              const item = $(el).text()
              ingredients.push(item.replace('▢ ',''))
            }) 

            $('.tasty-recipes-instructions-body li').each((i, el) => {
              const item = $(el).text()
              instructions.push(item)
            }) 
          }

          //allrecipes.com
          if (url.includes('allrecipes.com')) {
            recipeName = $('.article-info h1').text()
            description = $('.recipe-summary').find('p').text()
        
            $('.recipe-meta-item').children().each((i, el) => {
              const item = $(el).text()
              if (i == 1) {
                prepTime = item.trim()
              }
              if (i == 3) {
                cookTime = item.trim()
              }
            }) 
          
            $('.ingredients-section__fieldset li').each((i, el) => {
              const item = $(el).text()
              ingredients.push(item.replace('▢ ','').trim())
            }) 

            $('.instructions-section__fieldset li p').each((i, el) => {
              const item = $(el).text()
                instructions.push(item)
            }) 

          }

          //feelgoodfoodie.net
          if (url.includes('feelgoodfoodie.net')) {
            recipeName = $('.wprm-recipe').find('h2').text()
            prepTime = $('.wprm-recipe-prep-time-container').children('span').next().text()
            cookTime = $('.wprm-recipe-cook-time-container').children('span').next().text()
            description = $('.wprm-recipe-summary').find('span').text()

            $('.wprm-recipe-ingredient-group li').each((i, el) => {
              const item = $(el).text()
              ingredients.push(item.replace('▢ ',''))
            }) 


            $('.wprm-recipe-instruction-group li').each((i, el) => {
              const item = $(el).text()
              instructions.push(item)
            }) 
          }

          //gimmesomeoven.com
          if (url.includes('gimmesomeoven.com')) {
            recipeName = $('.tasty-recipes-header-content').find('h2').text()
            prepTime = $('.tasty-recipes-prep-time').text()
            cookTime = $('.tasty-recipes-cook-time').text()
            description = $('.tasty-recipes-description').find('p').text()

            $('.tasty-recipes-ingredients li').each((i, el) => {
              const item = $(el).text()
              ingredients.push(item)
            }) 

            $('.tasty-recipes-instructions li').each((i, el) => {
              const item = $(el).text()
              instructions.push(item)
            }) 
          }

          recipes = {
            recipeName: recipeName,
            prepTime: prepTime,
            cookTime: cookTime,
            description: description,
            ingredients: ingredients,
            instructions: instructions
          }
          res.status(200).send({
            success: recipes
          })
        }
      })
    }
    catch (err){
      console.log(err)
    }
  }
}
