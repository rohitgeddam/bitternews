const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fetch = require('node-fetch');

const JWT_SECRET = 'annacondalivesontreesbut1234easlions'

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

const comparePassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
}

const signJwt = (payload) => {

  return jwt.sign(payload, JWT_SECRET)
}

const getTokenPayload = (token) => {

    return jwt.verify(token, JWT_SECRET)

}

const getUserId = (req, authToken) => {

    if (req) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          throw new Error('No token found');
        }
        const { id } = getTokenPayload(token);
        return id;
      }
    } else if (authToken) {
      const { id } = getTokenPayload(authToken);
      return id;
    }
  
    throw new Error('Not authenticated');
  }
 
  const requestGithubToken = async credentials =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(async res => {
      return res.json();
    })
    .catch(error => {
      throw new Error(JSON.stringify(error));
    });

    const requestGithubUserAccount = token =>
  fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${token}`
    }
  }).then(
     res =>  res.json()
    
  );

  const requestGithubUser = async credentials => {
    const { access_token } = await requestGithubToken(credentials);

    const githubUser = await requestGithubUserAccount(access_token);

    return { ...githubUser, access_token };
  };


  module.exports = {
      requestGithubUser,  
      signJwt,
      comparePassword,
      getUserId,
      hashPassword
  }