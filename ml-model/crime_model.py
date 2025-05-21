# ml-model/crime_model.py
from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Mock prediction logic for now
    location = data.get("location", {})
    hour = data.get("hour", 12)
    district = data.get("district", "unknown")

    prediction = random.uniform(0, 1)  # Fake probability
    return jsonify({"crime_probability": prediction})

if __name__ == "__main__":
    app.run(port=5001)
