import pyrebase
import random
import time
import getMAC #gives access to MAC address w/o clutter
from datetime import datetime

#Boiler Plate Config for FireBase setup
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


#will need to figure out how to sign in and get uid but f that rn
firebaseUID = "321om6vQgbSCyihI0UnLP8fIesr2"


floor = "Second"
roomNum = "250"
MAC = getMAC.MAC
macObj = {"MAC":"00:0c:29:e0:60:36"}

#children information
sensors = {"temp": 0, "humidity": 0, "time": str(datetime.utcnow())}
sensors["temp"] = random.randrange(70, 76, 2)
sensors["humidity"] = random.randrange(20, 50, 2)

db.child(firebaseUID).child(floor).child(roomNum).set(macObj)


while 1:

    sensors["time"] = str(datetime.utcnow())

    randie = random.randrange(0, 3, 1)
    if randie == 2:
        sensors["temp"] +=1
        sensors["humidity"] +=1
    if randie == 3:
        sensors["temp"] -=1
        sensors["humidity"] -=1


    if sensors["temp"] < 65 | sensors["temp"] > 84:
        sensors["temp"] = 74
    
    if sensors["humidity"] < 5 | sensors["humidity"] > 70:
        sensors["humidity"] = 35

    print (sensors["temp"])

    #send data to database


 
    db.child(firebaseUID).child(floor).child(roomNum).child("Readings").set(sensors)
    db.child(firebaseUID).child(floor).child(roomNum).child("Logs").push(sensors)

    time.sleep(3) 
