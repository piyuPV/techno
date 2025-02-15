from openai import OpenAI
import requests
import os
import pickle
import urllib.parse
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import fitz  # PyMuPDF
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


def for_pdf(pdf_path):
    
    doc = fitz.open(pdf_path)
    text = ""
    
    for page in doc:
        text += page.get_text("text")  # Extract text from each page
        
    return text

pdf_file = "pdf.pdf"  
extracted_text = for_pdf(pdf_file)
print(extracted_text)

    
import google.generativeai as genai

# Configure API key
genai.configure(api_key="AIzaSyDV60ewpjmR81s7jW-2rgCLGfXoccbV4wM")

# Create model instance
model = genai.GenerativeModel("gemini-1.5-flash")  # or "gemini-pro"

# Generate response
response = model.generate_content(query)

# Print response
print(response.text)

