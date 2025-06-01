from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np
import os
import shutil

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your ngrok URL for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your dataset templates once on startup (optional optimization)
dataset_path = '/Users/srinadhreddy/Downloads/testapk/currency-recognition-app/Dataset'  # folder containing currency images

# Your currency recognition logic as a function
def recognize_currency(image_path):
    img_rgb = cv2.imread(image_path)
    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
    maxValue = 0
    flag = 0
    recognized = None
    currency = None
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            if 'Thumbs.db' not in file:
                template = cv2.imread(os.path.join(root, file), 0)
                w, h = template.shape[::-1]
                img_gray_resized = cv2.resize(img_gray, (w, h))
                res = cv2.matchTemplate(img_gray_resized, template, cv2.TM_CCOEFF_NORMED)
                threshold = 0.4
                loc = np.where(res >= threshold)
                for pt in zip(*loc[::-1]):
                    minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(res)
                    if minVal > maxValue:
                        maxValue = minVal
                        recognized = os.path.basename(root)
                        currency = os.path.basename(os.path.dirname(root))
                        flag = 1
    if flag == 1:
        try:
            recognized_float = float(recognized)
        except:
            recognized_float = 0
        result = {
            'currency_value': recognized,
            'currency_name': currency,
            'converted_values': {}
        }
        if currency == 'INR':
            result['converted_values']['Euro'] = round(recognized_float / 83.0, 2)
            result['converted_values']['USD'] = round(recognized_float / 75.0, 2)
        elif currency == 'USD':
            result['converted_values']['Euro'] = round(recognized_float / 1.11, 2)
            result['converted_values']['INR'] = round(recognized_float * 75.0, 2)
        else:
            result['converted_values'] = "Conversion not available"
        return result
    else:
        return {'error': 'Unable to recognize the currency'}

@app.post("/recognize")
async def recognize(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = recognize_currency(temp_file)
    
    # Remove temp file
    os.remove(temp_file)
    return JSONResponse(content=result)
