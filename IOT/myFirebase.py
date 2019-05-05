import pyrebase
import getMAC #gives access to MAC address w/o clutter



def getUserID():

    config = {
        "apiKey": "AIzaSyCLg4YBPW6KMlFoF7nFIr1ZtADSPmxMp80",
        "authDomain": "fir-web-43830.firebaseapp.com",
        "databaseURL": "https://fir-web-43830.firebaseio.com",
        "projectId": "fir-web-43830",
        "storageBucket": "fir-web-43830.appspot.com",
        "messagingSenderId": "567827194064"
    }

    firebase = pyrebase.initialize_app(config)

    # Get a reference to the auth service
    auth = firebase.auth()


    email = raw_input("Enter your Firebase Email\n")
    password = raw_input("Enter your Firebase Password\n")




    # Log the user in
    user = auth.sign_in_with_email_and_password(email, password)

    return user['localId']



def init(firebaseUID, floor, roomNum):
    config = {
        "apiKey": "AIzaSyCLg4YBPW6KMlFoF7nFIr1ZtADSPmxMp80",
        "authDomain": "fir-web-43830.firebaseapp.com",
        "databaseURL": "https://fir-web-43830.firebaseio.com",
        "projectId": "fir-web-43830",
        "storageBucket": "fir-web-43830.appspot.com",
        "messagingSenderId": "567827194064"
    }
    MAC = getMAC.MAC

    db.child(firebaseUID).child(floor).child(roomNum).set(macObj)
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()




def pushData(firebaseUID, floor, roomNum, dataOBJ):
    config = {
        "apiKey": "AIzaSyCLg4YBPW6KMlFoF7nFIr1ZtADSPmxMp80",
        "authDomain": "fir-web-43830.firebaseapp.com",
        "databaseURL": "https://fir-web-43830.firebaseio.com",
        "projectId": "fir-web-43830",
        "storageBucket": "fir-web-43830.appspot.com",
        "messagingSenderId": "567827194064"
    }






    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    db.child(firebaseUID).child(floor).child(roomNum).child("Readings").set(dataOBJ)
    db.child(firebaseUID).child(floor).child(roomNum).child("Logs").push(dataOBJ)
