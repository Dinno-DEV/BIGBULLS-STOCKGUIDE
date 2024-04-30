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
    inc_stmt = stock.income_stmt
    rec = stock.recommendations 
    BS = stock.balancesheet
    news = stock.news
    
    period = '1mo'
    interval = '30m'
    output_interval = re.findall(r'\d+', interval)
    output_interval = [float(num) for num in output_interval]
    
    hist1 = stock.history(period = period, interval = interval)
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
    model.add(LSTM(50, activation='relu', input_shape=(X1_train.shape[1], X1_train.shape[2])))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    model.fit(X1_train, y1_train, epochs=100, batch_size=32, verbose=1)
    
    In = Inference.values
    In = In.reshape((1, 1, In.shape[0]))
    pred = model(In)
    yhat_unnormalized = pred.numpy().tolist()[0][0] * (hist1['Close'].max() - hist1['Close'].min()) + hist1['Close'].min() 
    
    print(data['key']) 
    


    return Response({"message": "Data received successfully", "stockname": data['key'], "PredictedPrice": str(yhat_unnormalized) + "at" + str(hist1.index[-1] + pd.Timedelta(minutes=output_interval[0]))}, status=200)
