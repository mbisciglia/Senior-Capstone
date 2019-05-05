import pyrebase
import getMAC #gives access to MAC address w/o clutter
import sys
import time
from datetime import datetime
import Adafruit_DHT

# Parse command line parameters.
sensor_args = { '11': Adafruit_DHT.DHT11,
                '22': Adafruit_DHT.DHT22,
                '2302': Adafruit_DHT.AM2302 }

sensor = 11
pin = 4

#parent information
NodeID = "Node0"
Location = "Clausen 114"
MAC = getMAC.MAC
parent = {"Location":Location, "MAC":MAC}

#children information
sensors = {"temperature": 0, "humidity": 0, "timestamp": 0}
#print(sensors)
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

db.child(NodeID).set(parent)

logCounter = 0
while(True):

        humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

        # Un-comment the line below to convert the temperature to Fahrenheit.
        temperature = temperature * 9/5.0 + 32

        if humidity is not None and temperature is not None:
        	print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
		sensors["temperature"] = temperature
		sensors["humidity"] = humidity
		sensors["timestamp"] = str(datetime.utcnow())
        	db.child(NodeID).child("Readings").set(sensors)
        	if (logCounter == 10):
	                db.child(NodeID).child("ZLogs").push(sensors)
			logCounter = 0
		logCounter = logCounter + 1
		time.sleep( 5 )
        else:
        	print('Failed to get reading. Try again!')
        	sys.exit(1)


	#db.child(NodeID).child("Readings").set(sensors)



