from flask import Flask, request, jsonify
from openai import OpenAI
import requests
import os
import pickle
import urllib.parse
os.environ['KMP_DUPLICATE_LIB_OK']='True'

import easyocr
import numpy as np


app = Flask(__name__)

# Initialize the OpenAI client
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

# Define the operation function
def op(image_path):
    reader = easyocr.Reader(['en'], gpu = False)
    result = reader.readtext(image_path)

    reader = easyocr.Reader(['en'], gpu=True)
    result = reader.readtext(image_path)

    extracted_text = ""
    for detection in result:
        extracted_text += detection[1] + " " 

    print(extracted_text)
    query = extracted_text
    try:
        completion = client.chat.completions.create(
            model="nvidia/llama-3.1-nemotron-70b-instruct",
            messages=[{"role": "user", "content": query}],
            temperature=0.5,
            top_p=1,
            max_tokens=1024,
            stream=True
        )
        response_text = ""
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_text += chunk.choices[0].delta.content
        return response_text or "No response received from the AI model."
    except Exception as e:
        print("Error during AI processing:", e)
        return "An error occurred while processing your query."

# Define the API endpoint
@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query = data.get("query")
    if not query:
        return jsonify({"error": "Query not provided"}), 400
    result = op(image_path + " analyse this extracted text from the invoice and categorise them in bill no., date, etc")
    return jsonify({"Query": query, "response": result})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")