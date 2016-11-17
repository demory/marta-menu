import pandas as pd
import numpy as np
import datetime as dt

# read in data
stop_times = pd.read_csv('apcdata_year.filtered.csv')

# get hour from time
stop_times['hour'] = pd.to_datetime(stop_times['time'], format='%H:%M:%S').dt.hour

# select AM rush hour times and aggregate ons/offs by stop
temp = stop_times[(stop_times.hour>=6) & (stop_times.hour<9)]
sums = temp.groupby('stop_id').agg({'ons':'sum','offs':'sum','latitude':'first','longitude':'first'})
sums.loc[:,['ons','offs']]=sums.loc[:,['ons','offs']].fillna(0)

# write out data
sums.to_csv('amrush_y.csv')

# select PM rush hour times and aggregate ons/offs by stop
temp = stop_times[(stop_times.hour>=16) & (stop_times.hour<19)]
sums = temp.groupby('stop_id').agg({'ons':'sum','offs':'sum','latitude':'first','longitude':'first'})
sums.loc[:,['ons','offs']]=sums.loc[:,['ons','offs']].fillna(0)

# write out data
sums.to_csv('pmrush_y.csv')