import random
import time
import myFirebase
from datetime import datetime



firebaseUID = myFirebase.getUserID()


floor = raw_input("Enter floor name for your sensor\n")
roomNum = raw_input("Enter room number for your sensor\n")


myFirebase.pushData(firebaseUID, floor, roomNum, sensors)


#children information
sensors = {"temp": 0, "humidity": 0, "time": str(datetime.utcnow())}
sensors["temp"] = random.randrange(70, 76, 2)
sensors["humidity"] = random.randrange(20, 50, 2)



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


    #send data to database


    myFirebase.pushData(firebaseUID, floor, roomNum, sensors)
    print sensors

    time.sleep(3)