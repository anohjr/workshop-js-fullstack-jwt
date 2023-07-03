
# Workshop file upload : Express/React Multer

### Install dependencies
Install the dependencies project with the command:

```bash
npm run setup
```

### Set environment variables

In the `api` and `front` folder, copy the `.env.sample` file to `.env` and change the environment variables for connect to your local database.

### Database migration
migrate the SQL file `api/database.sql` with the command :
```bash
npm run migrate
```

### Running

You can start the project with the command:

```bash
npm run dev
```

# API

## 0 - Creating an account on Sendinblue

Sendinblue is a french emailing plateform. By using it, you will be able to use their SMTP parameters to send email from your app.

Create an account on this website : https://app.sendinblue.com/account/profile/

Add all informations needed. You will receive a confirmation email to finish the account creation. (Sendingblue recommends you to use a professionnal email, but you can use a classical email like a gmail one).

On your account, navigate to `Transactionel`. You will find these informations :

- SMTP server
- Port
- id
- SMTP key (you maybe need to generate it)

## 1 - Update env file

On the api folder, update your .env file and fill these informations with the credentials you get from sendingblue :

- SMTP_HOST=
- SMTP_PORT=
- SMTP_USER=
- SMTP_PASSWORD=

## 2 - Setup nodemailer helper method
You can read the following tutorial for helping you to setting up nodemailer : 
[1- nodemailer](https://dev.to/documatic/send-email-in-nodejs-with-nodemailer-using-gmail-account-2gd1)

0. Move to the api folder and install the nodemailer dependency:
`npm install nodemailer`.

1. Create a new folder named "helpers" into the src folder and create a `mailer.js` file in it.

2. Setup nodemailer transporter for email sending in `mailer.js` :
```js
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
});
```
NB : the secure key must be setting up to false for 587 PORT, and true for 465 PORT. By default, sendinBlue give you a 587 PORT.

3. Setup nodemailer and create sendMail method in `mailer.js` :

  - 3.1 Import nodemailer :
  ```js
  const mailer = require("nodemailer");
  ```

  - 3.2 Add and export a `sendResetPasswordMail` function who takes in parameters the following object => {dest, url}
  ```js
  const transporter = ...
  ...
  const sendResetPasswordMail = async ({dest, url}) => {
    
  };

  module.exports = {
    sendResetPasswordMail,
  };
  ```

  - 3.3 In your `sendResetPasswordMail` define the mail option with the following : 
  ```js
  const mailOptions = {
    from: process.env.SMTP_USER, // this is the address from which the email will be sent
    to: dest, // this is the address to which the email will be sent
    subject: "Reset your password",
    text: `Use this link to reset your password : ${url}`, // url will be defined later in our controller
    html: `<p>Use this link to reset your password : <a href=${url}>reset your password</a>`,
  };
  ```
  - 3.4 Finally, in your `sendResetPasswordMail` use the `sendMail` method of the transporter :
  ```js
  return transporter.sendMail(mailOptions);
  ```

4. Add a new post route `/sendResetPassword` in your module users :

  - 4.1 import the `sendResetPasswordMail` method in your user controller :
  ```js 
  const sendResetPasswordMail = require("../../helpers/mailer.js");
  ```

  - 4.2 Create a `sendResetPassword` method in your controller :
  ```js
  const sendResetPassword = (req, res, next) => {
    const {email} = req.body;
  }
  ```

  - 4.3 In the `sendResetPassword` method generate a new jwt with the email value as a payload :
  ```js
  const resetToken = jwt.sign({user: email}, process.env.JWT_AUTH_SECRET);
  ```

  - 4.4 After generating the resetToken create a const `url` with the following structure :
  ```js
  const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  ```

  - 4.5 Finally, call the `sendResetPasswordMail` passing it as a parameters the following : 
  ```js
  await sendResetPasswordMail({email, url});
  ```

  - 4.6 If no error occured just send a response with 200 http status (dont forget to catch the error), and dont forget to export your method for link to your route in the index.js file of the users module.

5. Add a new post route `/resetPassword` in your module users :

  - 5.1 Create a `resetPassword` method in your controller :
  ```js
  const resetPassword = (req, res, next) => {
    const {token, password} = req.body;
  }
  ```

  - 5.2 decode the token for getting the user email in the payload

  - 5.4 If the token is valid :
    - 5.4.1 generate a hash of the password with argon
    - 5.4.2 call a update method from your model for updating the password of the user


# Front

## 1 - Add a forgotPassword link and page

  - 1 In the `Login.jsx` page add a link `reset my password` for redirect to a `/forgotPassword` route

  - 2 create a page component `ForgotPassword` that include a form with a email input and submit button

  - 3 Add a handleSubmit method for calling the post route `sendResetPassword` with axios

## 2 - Create the `/resetPassword/:token` route with the associated page component

  - 1 Create a page component `ResetPassword` that include a form with a password input and a submit button

  - 2 Get the token in the url with `useParams` hook : https://reactrouter.com/en/main/hooks/use-params

  - 3 Add a handleSubmit method for calling the post route `resetPassword` with axios

  - 4 If no error occured, redirect to the login page.
