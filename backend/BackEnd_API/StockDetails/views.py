from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from keras.models import Sequential
from keras.layers import LSTM, Dense
import yfinance as yf
import numpy as np
import pandas as pd
import re

    
@api_view(['POST'])
def receive_data(request):
    data = request.data
    print('Got Value of:'+str(data['key'])+', Training')
    stock = yf.Ticker(str(data['key']))
    info = stock.info
    CurrentFin = stock.quarterly_financials.loc[['Total Revenue','Gross Profit', 'Net Income' ,'Cost Of Revenue', 'Operating Revenue', 'Total Expenses']].to_dict()
    for i in list( CurrentFin.keys()):
         CurrentFin[str(i)] =  CurrentFin.pop(i)   
    
    #The Below is the 30m
    hist1 = stock.history(period = '60d', interval = '30m')
    hist_normalized1 = (hist1 - hist1.min()) / (hist1.max() - hist1.min())

    Y1 = hist_normalized1['Close'].iloc[1:]
    X1 = hist_normalized1.drop('Close', axis=1)
    X1 = X1.drop('Dividends', axis=1)
    X1 = X1.drop('Stock Splits', axis=1)
    Inference = X1.iloc[-1]
    X1 = X1.iloc[:-1]
    X1_Values = X1.values
    X1_reshape = X1_Values.reshape((X1_Values.shape[0], 1, X1_Values.shape[1]))
    X1_train, y1_train = X1_reshape, Y1
    
    model = Sequential()
    model.add(LSTM(50, activation='tanh', input_shape=(X1_train.shape[1], X1_train.shape[2])))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    model.fit(X1_train, y1_train, epochs=10)
    
    In = Inference.values
    In = In.reshape((1, 1, In.shape[0]))
    pred = model(In)
    yhat_unnormalized_30m = pred.numpy().tolist()[0][0] * (hist1['Close'].max() - hist1['Close'].min()) + hist1['Close'].min() 
    
    #The Below is for 1 Hour
    hist1.index = pd.to_datetime(hist1.index)
    hourly_data = hist1.resample('H').agg({'Open': 'first',
                                      'High': 'max',
                                      'Low': 'min',
                                      'Close': 'last',
                                      'Volume': 'sum'})

    hourly_data_normalized = (hourly_data - hourly_data.min()) / (hourly_data.max() - hourly_data.min())
    hourly_data_normalized.dropna(inplace=True)
    Y1hr = hourly_data_normalized['Close'].iloc[1:]
    X1hr = hourly_data_normalized.drop('Close', axis=1)
    Inference1hr = X1hr.iloc[-1]
    X1hr = X1hr.iloc[:-1]
    X1hr_Values = X1hr.values
    X1hr_reshape = X1hr_Values.reshape((X1hr_Values.shape[0], 1, X1hr_Values.shape[1]))
    X1hr_train, y1hr_train = X1hr_reshape, Y1hr
    
    model = Sequential()
    model.add(LSTM(50, activation='tanh', input_shape=(X1hr_train.shape[1], X1hr_train.shape[2])))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    model.fit(X1hr_train, y1hr_train, epochs=10)
    
    In1hr = Inference1hr.values
    In1hr = In1hr.reshape((1, 1, In1hr.shape[0]))
    pred = model(In1hr)
    yhat_unnormalized_1hr = pred.numpy().tolist()[0][0] * (hourly_data['Close'].max() - hourly_data['Close'].min()) + hourly_data['Close'].min()
    
    #The below is the 1day prediction
    hist = stock.history(period = '1y', interval = '1d')
    hist_normalized = (hist - hist.min()) / (hist.max() - hist.min())
    hist_inference = hist_normalized.iloc[-1]
    hist_normalized = hist_normalized.iloc[:-1]
    Y = hist_normalized['Close']
    X = hist_normalized.drop('Close', axis=1)
    X = X.drop('Dividends', axis=1)
    X = X.drop('Stock Splits', axis=1)
    X_Values = X.values
    X_reshape = X_Values.reshape((X_Values.shape[0], 1, X_Values.shape[1]))
    X_train, y_train = X_reshape, Y
    model = Sequential()
    model.add(LSTM(50, activation='tanh', input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    model.fit(X_train, y_train, epochs=10)
    pred = model(hist_inference.drop('Close')[:4].values.reshape((1, 1, hist_inference.drop('Close')[:4].shape[0])))
    yhat_unnormalized_1day = pred.numpy().tolist()[0][0] * (hist['Close'].max() - hist['Close'].min()) + hist['Close'].min()

    return Response({"Message": "Data received successfully", 
                     #The below is the Info of the Company
                     "StockSym": data['key'], 
                     "StockName": info['shortName'],
                     "CurrentPrice": info['currentPrice'],
                     "OpenPrice": info['open'],
                     "PrevClose": info['previousClose'],
                     "PrecentDiff": str(((info['currentPrice'] - info['previousClose']) / info['previousClose']) * 100),
                     "TargetMeanPrice":info['targetMeanPrice'],
                     "TargetMedianPrice":info['targetMedianPrice'],
                     "Currency": info['currency'],
                     "MarketCap": info['marketCap'],
                     "TimeZone": info['timeZoneFullName'],
                     "City": info['city'],
                     "State": info['state'],
                     "Country": info['country'],
                     "Industry": info['industry'],
                     "Website": info['website'],
                     "Phone": info['phone'],
                     "ImpEmp_ToKnow_Name": info['companyOfficers'][0]['name'],
                     "ImpEmp_ToKnow_Title": info['companyOfficers'][0]['title'],
                     "AnalysisGrades": stock.upgrades_downgrades.iloc[:3].reset_index().loc[:, ['Firm', 'ToGrade', 'GradeDate']].to_dict('records'),
                     "Recommendtations": stock.recommendations.to_dict("records"),
                     "RecommendationSummary": info['recommendationKey'],
                     "CurrentNews": stock.news,
                     "CurrentFin":  CurrentFin,
                     "PredictedPrice_30M": str(yhat_unnormalized_30m) + " BY " + str(hist1.index[-1] + pd.Timedelta(minutes=30)), 
                     "PredictedPrice_60M": str(yhat_unnormalized_1hr) + " BY " + str(hourly_data.index[-1] + pd.Timedelta(minutes=60)),
                     "PredictedPrice_1D": str(yhat_unnormalized_1day) + " BY " + str(hist.index[-1] + pd.Timedelta(minutes=1440)),
                     "Major_Holders": stock.major_holders.to_dict()['Value'],
                     
                     }, status=200)
