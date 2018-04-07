import pymysql
import sys
import json
import os

config_path=os.path.abspath(os.path.join(__file__ ,"../../.."))
config=json.load(open(os.path.join(config_path,'config.json')))
print(config['energy_data']['host'])
