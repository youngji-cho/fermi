# -*- coding: utf-8 -*-
import sys
import os
module_config =os.path.abspath(os.path.join(__file__ ,"../../../lib/python3.6/site-packages"))
config_path=os.path.abspath(os.path.join(__file__ ,"../../.."))
sys.path.append(module_config)
print(sys.path)
