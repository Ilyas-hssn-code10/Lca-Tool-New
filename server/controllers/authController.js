/* 
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID="31772710752-g2q3igkeqqhmokdiogrrliro2bne42qf.apps.googleusercontent.com"
  });
  const payload = ticket.getPayload();
  const _id = payload['sub'];
} 




verify().catch(console.error); 
*/ 

const {GOOGLE_CLIENT_ID, JWT_SECRET } = process.env;

app.post('/api/v1/auth/google', async ({ body: { tokenId } }, res) => {

  const client = new OAuth2Client(GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_CLIENT_ID,
  });

  const response = ticket.getPayload();

  if (response.iss !== 'accounts.google.com' && response.aud !== GOOGLE_CLIENT_ID)
    return res.status(400).json({ status: 'error', error: 'Bad Request' });

  const user = {
    email: response.email,
    image: response.picture,
    social_id: response.sub,
    first_name: response.given_name,
    last_name: response.family_name,
  };

  let result = await User.findOne({
    where: { [Op.or]: [{ email: user.email }, { social_id: user.social_id }] },
  });

  if (!result) result = await User.create(user);

  const token = await jwt.sign({ id: result.dataValues.id }, JWT_SECRET, { expiresIn: '1hr' });
  const data = { token, ...result.dataValues};

  res.status(200).json({ status: 'success', data });

});