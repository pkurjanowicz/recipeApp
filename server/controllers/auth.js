function auth(req, res) {
  if (!req.session.user) { 
    res.status(200).send({
      response: false
    })
  } else {
    res.status(200).send({
      response: true
    })
  }
}

module.exports = auth;
