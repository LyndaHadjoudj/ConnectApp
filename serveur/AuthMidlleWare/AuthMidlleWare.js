const { verify } = require('jsonwebtoken')


const ValidateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    // console.log(`the access login value is ${accessToken}`);
    if (!accessToken) res.json({ error: "Users not logged in" });
    else {
        try {
            const validateToken = verify(accessToken, "importnatsecret");
            req.testuser = validateToken;/*cette variable est accessible à tout les classes qui appelle la fonctio
            ValidateToken  */
            if (validateToken) {
                return next()
            }
        } catch (err) {
            return res.json({ error: err });
        }
    }
}

module.exports = { ValidateToken };