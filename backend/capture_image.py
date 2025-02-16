import tkinter as tk
from tkinter import messagebox
import os
import cv2
import shutil


# Ensure the data directory exists
data_dir = 'data_dir'
os.makedirs(data_dir, exist_ok=True)

# remove existing image
# image = 'data_dir/captured_image.png'
# if image is not None and os.path.exists(image):
#     os.remove(image)

# Function to view existing images
def view_data():
    files = os.listdir(data_dir)
    if files:
        messagebox.showinfo("Existing Data", f"Images in {data_dir}:\n" + "\n".join(files))
    else:
        messagebox.showinfo("Existing Data", "No images found.")

# Function to capture an image with a default name
def capture_image():
    image_name = "captured_image.png"  # Default name
    file_path = os.path.join(data_dir, image_name)

    cam = cv2.VideoCapture(0)  # Open default camera
    if not cam.isOpened():
        messagebox.showerror("Camera Error", "Failed to access the camera.")
        return

    messagebox.showinfo("Instructions", "Press 'SPACE' to capture the image, or 'ESC' to exit.")

    while True:
        ret, frame = cam.read()
        if not ret:
            messagebox.showerror("Camera Error", "Failed to capture the frame.")
            break

        cv2.imshow("Camera Feed - Press 'SPACE' to Capture", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == 27:  # ESC key to exit
            break
        elif key == 32:  # SPACE key to capture
            cv2.imwrite(file_path, frame)
            messagebox.showinfo("Success", f"Image saved as {file_path}.")
            break

    cam.release()
    cv2.destroyAllWindows()

# Create the Tkinter window
window = tk.Tk()
window.geometry('800x500')
window.title('Image Capture Tool')

# Label
label = tk.Label(window, text="Capture and View Images", font=('Times New Roman', 24, 'bold'))
label.pack(pady=20)

# Buttons
button1 = tk.Button(window, text='Capture Image', font=('Times New Roman', 20, 'bold'), command=capture_image)
button1.pack(pady=20)

button2 = tk.Button(window, text='View Existing Images', font=('Times New Roman', 20, 'bold'), command=view_data)
button2.pack(pady=20)

# Run the Tkinter loop
window.mainloop()