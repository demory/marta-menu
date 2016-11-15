import pandas as pd
import numpy as np
import datetime as dt

# initialize filtered dataset
columns = pd.read_csv('apcdata_fullyear.csv',nrows=1).columns
filtered = pd.DataFrame(columns=columns)

# read in data in chunks, get wednesdays (including post midnight), 
# append to filtered data
chunksize = 10 ** 6
for chunk in pd.read_csv('apcdata_fullyear.csv', chunksize=chunksize):
    chunk['time']=chunk['arrival_time'].fillna(chunk['departure_time'])   
    chunk['weekday'] = pd.to_datetime(chunk['calendar_day'], format='%m/%d/%Y').dt.dayofweek
    chunk['hour'] = pd.to_datetime(chunk['time'], format='%H:%M:%S').dt.hour
    chunk = chunk[((chunk.weekday==2) & (chunk.hour>=4)) | ((chunk['weekday']==3) & (chunk['hour']<3))]
    filtered = pd.concat([filtered,chunk], ignore_index=True)

# write out filtered data    
filtered.to_csv('apcdata_year.filtered.csv',index=None)