from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)

app.secret_key = b'*dsa#5448-_3>|<'
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

bcrypt = Bcrypt(app)

# Route for user signup
@app.route('/users/create', methods=["POST"])
def makeUser():
    print(request.json)
    email = request.json['email']
    password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
    print(password)

    if not email or email == '':
        return jsonify({'error': 'Email cannot be empty.'})
    if not password or password == '':
        return jsonify({'error': 'Password cannot be empty.'})
    
    user = getUser(email)

    if user != None:
        return jsonify({'error': 'Account associated with that email already exists.'})
    elif user == False:
        return 'Something went wrong.', 400

    mongo.db.user.insert({'email': email, 'password': password});
    return 'User created successfully.', 201

# Route for user login
@app.route('/users/<userId>', methods=["POST"])
def login(userId):
    print(request.json)
    email = request.json['email']
    password = request.json['password']

    if not email or email == '':
        return jsonify({'error': 'Email cannot be empty.'})
    if not password or password == '':
        return jsonify({'error': 'Password cannot be empty.'})

    user = getUser(email)

    if user == None:
        return jsonify({'error': 'Email / Password combo not valid.'})
    elif not user:
        return 'Something went wrong.', 400

    isMatch = bcrypt.check_password_hash(user['password'], password)

    if not isMatch:
        return jsonify({'error': 'Email / Password combo not valid.'})
    
    return True
def getUser(email):
    if not isinstance(email, str):
        return False
    return mongo.db.user.find_one({'email': email})
    
if __name__ == '__main__':
    app.run(debug=True)
