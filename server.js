require('dotenv').config();
let bodyParser = require('body-parser')
let express    = require('express');
let app        = express();
let cors       = require('cors');
let router     = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({
	extended: false
}));



// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



app.post('/api/mail', function(req,res) {


	console.log(req.body)
	let msgTwo = {
  to: 'AndrewBroestl@gmail.com',
  from: req.body.email,
  subject: req.body.subject,
  text: req.body.text,
  html: `<strong>${req.body.text}</strong>`,
};

	sgMail.send(msgTwo).then(() => {
		console.log('promise resolution')
		res.send('Thank You')
	})
	.catch((err) => {
		console.log(err)
		res.send(err.message + ' email not sent');
	});
//	res.sendStatus(200)
//	res.send('Thank You')
})

app.get('/api/all', function(req, res) {
	res.send('hello')
})

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log(`listening on port ${ port }`);
});