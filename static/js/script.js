document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const imageInput = document.getElementById('imageInput');
    const submitButton = document.getElementById('submit');
    const predictionText = document.getElementById('prediction');
    const confidenceText = document.getElementById('confidence');
    const errorText = document.getElementById('error');

    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            console.log('Webcam accessed successfully');
            video.srcObject = stream;
        })
        .catch(err => {
            console.error('Error accessing webcam:', err);
            errorText.textContent = 'Could not access webcam. Please upload an image instead.';
        });

    // Capture photo from video
    captureButton.addEventListener('click', () => {
        console.log('Capture button clicked');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        imageInput.files = null; // Clear file input
        console.log('Photo captured, canvas width:', canvas.width);
    });

    // Submit image for prediction
    submitButton.addEventListener('click', () => {
        console.log('Submit button clicked');
        predictionText.textContent = '';
        confidenceText.textContent = '';
        errorText.textContent = '';

        let file;
        if (imageInput.files && imageInput.files[0]) {
            file = imageInput.files[0];
            console.log('File selected from input:', file.name);
        } else if (canvas.width > 0) {
            file = dataURLtoFile(canvas.toDataURL('image/jpeg'), 'captured_image.jpg');
            console.log('File created from canvas');
        } else {
            errorText.textContent = 'Please upload an image or capture a photo.';
            console.log('No file selected or captured');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        console.log('FormData created, file:', formData.get('file').name);

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Fetch response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Fetch response data:', data);
            if (data.error) {
                errorText.textContent = data.error;
            } else {
                predictionText.textContent = `Predicted Maturity: ${data.prediction}`;
                confidenceText.textContent = `Confidence: ${data.confidence}`;
            }
        })
        .catch(err => {
            errorText.textContent = 'Error processing the image.';
            console.error('Fetch error:', err);
        });
    });

    // Convert canvas data URL to File object
    function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
});