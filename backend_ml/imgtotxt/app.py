from flask import Flask, request, jsonify
import os
import fitz  # PyMuPDF
import easyocr
import google.generativeai as genai
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configure API key for Google Gemini AI
genai.configure(api_key="AIzaSyDV60ewpjmR81s7jW-2rgCLGfXoccbV4wM")

# Function to extract text from an image
def extract_text_from_image(image_path):
    reader = easyocr.Reader(['en'], gpu=True)
    result = reader.readtext(image_path)
    extracted_text = " ".join([detection[1] for detection in result])
    return extracted_text

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    extracted_text = "".join([page.get_text("text") for page in doc])
    print(extracted_text)
    return extracted_text

# Function to process text using Gemini AI
def analyze_text_with_gemini(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    query = text + " Categorize this extracted text into  invoiceFile: ,invoiceNumber:,invoiceDate: ,invoiceDueDate:,invoiceAmount:,vendor:,category: ,invoiceType: ,subCategory: ,companyId: ,userId: , in JSON format for  only use these parameter no more no less and if not available return null to it nothing else."
    response = model.generate_content(query)
    return response.text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join("uploads", filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    # Check if file is an image or PDF
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        extracted_text = extract_text_from_image(file_path)
    elif filename.lower().endswith('.pdf'):
        extracted_text = extract_text_from_pdf(file_path)
    else:
        return jsonify({"error": "Unsupported file format. Upload a PDF or image."}), 400

    # Analyze the extracted text using Gemini AI
    response_text = analyze_text_with_gemini(extracted_text)
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(debug=True)
