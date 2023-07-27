from django.urls import path
from . import views

urlpatterns = [
    path('', views.speech_recognition_view, name='speech-recognition'),
    path('text_answer_view', views.text_answer_view.as_view(), name='text_answer_view'),
]
