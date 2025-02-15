from openai import OpenAI
import requests
import os
import pickle
import urllib.parse
os.environ['KMP_DUPLICATE_LIB_OK']='True'

import easyocr
import numpy as np


def text(image):
    reader = easyocr.Reader(['en'], gpu=True)
    result = reader.readtext(image)

    extracted_text = ""
    for detection in result:
        extracted_text += detection[1] + " " 

    # print(extracted_text)
    return extracted_text

query = text('1.png') + "analyse this extracted text from the invoice and categorise them in bill no., date, etc in json and nothing else"


    
import google.generativeai as genai

# Configure API key
genai.configure(api_key="AIzaSyDV60ewpjmR81s7jW-2rgCLGfXoccbV4wM")

# Create model instance
model = genai.GenerativeModel("gemini-1.5-flash")  # or "gemini-pro"

# Generate response
response = model.generate_content(query)

# Print response
print(response.text)

