from http.client import HTTPResponse
from django.shortcuts import render
from django.template.loader import get_template
from django.template.response import TemplateResponse
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from difflib import get_close_matches
from chatbot_app.models import Answer, Question
# from .bot import bot_response  # The function containing the botVoice logic

class text_answer_view(APIView):
    def post(self, request):
        message = request.data.get('message', '').lower()
        response = "Ich verstehe das nicht"  # Default response for unknown messages

        # Add your chatbot logic here to generate appropriate responses based on the message
        
        all_questions = Question.objects.all()

        # Calculate similarity and find the answer with the highest match
        best_match = None
        best_match_score = 0

        for question in all_questions:
            similarity = self.calculate_similarity(message, question.content.lower())
            if similarity > 30 and similarity > best_match_score:
                best_match = question
                best_match_score = similarity

        if best_match:
            best_answer = Answer.objects.filter(question_id=best_match).last()
            response = best_answer.content
        else:
            response = "Ich verstehe das nicht"

        return Response({'text': response})
    
    def calculate_similarity(self, message, answer_text):
        # Use Levenshtein distance or other similarity metrics to calculate similarity
        return 100 - (100 * (get_close_matches(message, [answer_text], n=1, cutoff=0.5) == []))





def speech_recognition_view(request):
    # user_input = request.data.get('user_input', '').lower()
    response_text =  "Got it"
    response = TemplateResponse(request, 'index.html', {})
    return response