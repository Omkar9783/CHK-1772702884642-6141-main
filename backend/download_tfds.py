import os
import tensorflow as tf
import tensorflow_datasets as tfds
from PIL import Image
import numpy as np

def download_and_save_tfds():
    print("Loading PlantVillage dataset via TensorFlow Datasets...")
    # Load dataset and get info
    ds, info = tfds.load('plant_village', split='train[:5%]', with_info=True, as_supervised=True)
    
    output_dir = "dataset"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Extracting images to '{output_dir}' directory...")
    
    for i, (image_tensor, label_tensor) in enumerate(ds):
        label_id = label_tensor.numpy()
        label_name = info.features['label'].int2str(label_id)
        
        # Format folder name
        label_name = label_name.replace(" ", "_").replace("/", "_")
        class_dir = os.path.join(output_dir, label_name)
        if not os.path.exists(class_dir):
            os.makedirs(class_dir)
            
        # Convert tensor to PIL Image
        img_array = image_tensor.numpy()
        img = Image.fromarray(img_array)
        
        img_path = os.path.join(class_dir, f"img_{i}.jpg")
        img.save(img_path)
        
        if (i+1) % 500 == 0:
            print(f"Saved {i+1} images...")
            
    print(f"Done! All images saved to '{output_dir}'.")

if __name__ == "__main__":
    download_and_save_tfds()
