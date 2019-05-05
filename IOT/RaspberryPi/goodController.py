import time
import myFirebase
from datetime import datetime
import sys
import Adafruit_DHT

# Parse command line parameters.
sensor_args = { '11': Adafruit_DHT.DHT11,
                '22': Adafruit_DHT.DHT22,
                '2302': Adafruit_DHT.AM2302 }

sensor = 11
pin = 4

firebaseUID = myFirebase.getUserID()


floor = raw_input("Enter floor name for your sensor\n")
roomNum = raw_input("Enter room number for your sensor\n")


#myFirebase.init(firebaseUID, floor, roomNum)


#children information
sensors = {"temp": 0, "humidity": 0, "time": str(datetime.utcnow())}

while(True):

        sensors["time"] = str(datetime.utcnow())

        humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
        # comment the line below to convert the temperature to Celcius.
        temperature = temperature * 9/5.0 + 32

        if humidity is not None and temperature is not None:
        	print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
		sensors["temp"] = temperature
		sensors["humidity"] = humidity
		myFirebase.pushData(firebaseUID, floor, roomNum, sensors)
            	print sensors		
            	time.sleep( 5 )

        else:
        	print('Failed to get reading. Try again!')
        	sys.exit(1)

