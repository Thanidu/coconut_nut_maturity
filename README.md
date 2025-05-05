# Coconut Maturity Classifier

This is a Flask web application that classifies the maturity level of coconuts (immature, mature, over-mature, or other) using a pre-trained TensorFlow Keras model. Users can upload an image or capture a photo using their device camera, and the app displays the predicted maturity level along with a confidence score.

## Features
- Upload coconut images or capture photos via webcam.
- Predicts maturity level using a fine-tuned CNN model.
- Displays prediction and confidence score on the same page.
- Responsive UI with Tailwind CSS styling.

## Project Structure
```
coconut_maturity_app/
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── templates/
│   └── index.html
├── uploads/
├── app.py
├── Fine-tuned_coconut_maturity_model.h5
└── README.md
```

- `app.py`: Flask application handling image uploads and predictions.
- `index.html`: HTML template for the web interface.
- `styles.css`: Custom CSS for additional styling.
- `script.js`: JavaScript for camera access and form submission.
- `Fine-tuned_coconut_maturity_model.h5`: Pre-trained Keras model.
- `uploads/`: Directory for temporary image storage.

## Prerequisites
- Python 3.6 or higher
- A webcam (for photo capture)
- A trained model file (`Fine-tuned_coconut_maturity_model.h5`)

## Installation
1. **Clone the Repository** (or create the project structure manually):
   ```bash
   git clone https://github.com/Thanidu/coconut_nut_maturity.git
   cd coconut_nut_maturity
   ```

2. **Install Dependencies**:
   ```bash
   pip install flask tensorflow keras numpy pillow flask-cors
   ```

3. **Place the Model File**:
   - Ensure `Fine-tuned_coconut_maturity_model.h5` is in the project root directory.
   - If the model is elsewhere, update the path in `app.py`:
     ```python
     model = load_model('path/to/Fine-tuned_coconut_maturity_model.h5')
     ```

4. **Verify Folder Structure**:
   - Confirm all files are in the correct directories as shown above.
   - Create the `uploads/` directory if it doesn’t exist:
     ```bash
     mkdir uploads
     ```

## Running the Application
1. **Start the Flask Server**:
   ```bash
   python app.py
   ```
   - The app will run at `http://127.0.0.1:5000`.

2. **Access the App**:
   - Open a browser and navigate to `http://127.0.0.1:5000`.
   - You should see the Coconut Maturity Classifier interface.

3. **Usage**:
   - **Upload Image**: Click "Choose File" to select a coconut image (JPEG/PNG).
   - **Capture Photo**: Click "Capture Photo" to take a picture using your webcam.
   - **Submit**: Click "Submit" to get the maturity prediction.
   - The predicted maturity level (e.g., `mature`) and confidence score (e.g., `95.23%`) will appear below the submit button.

## Troubleshooting
- **404 Error on Submit**:
  - Ensure `app.py` is running and the `/predict` endpoint is accessible.
  - Verify the project structure, especially `static/js/script.js` and `templates/index.html`.
  - Access the app via `http://127.0.0.1:5000`, not by opening `index.html` directly.
- **Webcam Issues**:
  - Ensure browser permissions allow camera access.
  - Test on `localhost` or an HTTPS server (required for camera functionality).
- **Model Errors**:
  - Confirm `Fine-tuned_coconut_maturity_model.h5` is in the root directory and not corrupted.
  - Check the Flask console for model loading errors.
- **No Response on Submit**:
  - Open DevTools (F12) > Console and check for errors.
  - Ensure `script.js` logs events like "Submit button clicked" (see `script.js` for debugging logs).

## Notes
- The app requires a secure context (`https` or `localhost`) for webcam access.
- The model expects images of size 224x224 pixels. Uploaded images are automatically resized.
- For production, deploy with HTTPS and consider optimizing the model with TensorFlow Lite.

## Future Improvements
- Deploy the app on a cloud platform (e.g., Heroku, AWS).
- Add image preview before submission.
- Implement user feedback for incorrect predictions.
- Optimize the model for faster inference on low-resource devices.

## License
This project is for personal use and not licensed for commercial distribution. Ensure you have rights to the model and images used.

## Contact
For issues or suggestions, please open an issue on the repository or contact the developer.
