
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

## 1 - Setup multer upload file middleware
You can read the following tutorial for helping you to setting up multer middlewares : 
[1-multer/express](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466627-acceptez-les-fichiers-entrants-avec-multer)
[2-multer/express](https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/)

0. In your server config use the express.static middleware globally with the following options (don't forget to import the path package: (its include into nodejs no need to install it) : 
```js 
express.static(path.join(__dirname + "/../public/upload"));
``` 

1. Install multer dependencie with npm  !(warning : install the package into the api folder)!

2. Create a file named `fileUpload.js`into your middlewares folder and import `multer` & `path` package from your node_modules

3. Create a `storage` constant whose value is the return of the `diskStorage` method:
(the diskStorage method takes an object as a parameter which contains 2 options {destination, filename}: the destination option allows us to specify the access path to the folder in which the files will be stored and filename allows us to rename the file before store it)
  - 3.1 the option destination and filename have the value of a function structured as follows:
  ```js 
  destination : (req, file, callback) => {},
  filename: (req, file, callback) => {}
  ```
  - 3.2 In the destination function: call the `callback` by first setting the `null` value and secondly setting the path to the `upload` folder, for that you can use the same logic as for express.static using the path.join method and the __dirname variable to concatenate with the folder path.
  - 3.3 In the filename function: call the `callback` by passing it the value `null` as the first parameter and as the second parameter a string that will concatenate the call to the Date.now() method with the name of the file which you can retrieve via file.originalname

4. Create a `fileFilter` constant which must have a function as its value structured as follows: 
```js
(req, file, callback) => {}
```
  - 4.1 First create an array type constant that contains all file mimetypes accepted for upload in our case we only accept images, example of mimetype: "image/jpg"
  - 4.2 Set up a condition within your fileFilter method by validating that the mimetype of the file to send corresponds to a value defined in your array (you can retrieve the mimetype of the file to send via file.mimetype)
  - 4.3 If the mimetype of the file matches: call the callback method passing it `null` as the first parameter and `true` as the second parameter to accept the file upload
  - 4.4 if the mimetype of the file does not match: call the callback method passing it a new Error("Only filetype image is allowed")

5. Export the call to the multer() method by passing as a parameter an object that contains 2 keys: storage & fileFilter that we have defined beforehand


## 2 - Create a update route for users

1. Add a new methode `updateOne` in your model for users, this method should take a object user and a id in parameters, this methode should make a query for updating the user data

2. Import your `updateOne` methode in your controller and define a new method called `updateAvatar`
  - 2.1 First of all your method must check the existence of the file and return a status 400 with an error message in case the file is missing (you can recover the file via req.file !warning! req.file will be defined via multer middleware call no need to test for now)
  - 2.2 Create a constant `uploadedFilePath` which takes in value the access path to the file on your server, the generated value must look like this: "http://localhost:8080/upload/${filename}", for that you can use the following variables: req.protocol & req.get("host") & req.file.filename
  - 2.3 Call your `updateOne` method defined earlier by passing it as the first parameter an object with the `avatar` key which takes the value of the `uploadedFilePath` constant, and as the second parameter the id of the user making the request via the variable req.idUser (this implies that our route is only accessible if we are connected and that therefore we apply our auth middleware to it)
  - 2.4 If everything went well, return a status of 200 with an object with the avatar key that takes the value of the `uploadedFilePath` constant

3. Create a route post /users/updateAvatar
  - 3.1 Import the `updateAvatar` method of your controller as well as your multer middleware
  - 3.2 Create a post route that takes "/users/updateAvatar" as an endpoint, this route must include your authentication middleware followed by the `multer.single("avatar")` middleware and your `updateAvatar` controller method


# Front

## 1 - Add a form to manage the upload on the Home page

1. In your `Home.jsx` component, add an html form including a file-type input and a submit-type button, linked the value of the file input to a constant `file` by calling the `useRef` hook and the ref property in your input

2. Add a `handleSubmit` method that will be called when the form is submitted

3. In your `handleSubmit` method create a `form` constant which takes in value an instance of the formData class (this class exists by default no need to import it)

4. Call the append method from your `form` constant to add your `file.current.files[0]` constant to your formData with the key "avatar" ( !warning: avatar is the name that we expect to get in our api !)

5. Make a post request via axios on the "/users/updateAvatar" route by passing our `form` constant as a parameter (ideally declare the method in your service!)
