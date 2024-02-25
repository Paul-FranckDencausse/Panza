const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: "Pas de jetons d'authentification fourni" });
    } else {
      // On split le token car il est composé de Bearer avant
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      const userId = decodedToken.userId;

      // l'objet req/request est transmis aux routes qui vont être appelées
      // on va donc créer un objet ici auth avec comme info l'id
      req.auth = {
        userId: userId,
      };
      // Si tout va bien, on passe au code suivant avec next
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
