from StockDetails.views import receive_data
from django.urls import path

urlpatterns = [
    path('StockDetails', receive_data, name='receive_data'),
]