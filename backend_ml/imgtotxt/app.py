from flask import Flask, request, jsonify
import os
import easyocr
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyDV60ewpjmR81s7jW-2rgCLGfXoccbV4wM")
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Flask app
app = Flask(__name__)

# OCR function
def extract_text(image_path):
    reader = easyocr.Reader(['en'], gpu=False)
    result = reader.readtext(image_path)
    extracted_text = " ".join([detection[1] for detection in result])
    return extracted_text

@app.route('/process_invoice', methods=['POST'])
def process_invoice():
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400
    
    image = request.files['image']
    image_path = "1.png"
    image.save(image_path)
    
    extracted_text = extract_text(image_path)
    query = extracted_text + " analyse this extracted text from the invoice and categorise them in bill no., date, etc in JSON and nothing else"
    
    response = model.generate_content(query)
    
    return jsonify({"Extracted Text": extracted_text, "Categorized Data": response.text})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
