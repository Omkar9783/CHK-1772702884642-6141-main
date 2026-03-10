import os
import shutil

source_dir = r"C:\Users\anasv\tensorflow_datasets\downloads\extracted\ZIP.data.mend.com_publ-file_data_tywb_file_d565-c1rDQyRTmE0CqGGXmH53WlQp0NWefMfDW89aj1A0m5D_A\Plant_leave_diseases_dataset_without_augmentation"
dest_dir = "dataset"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

print("Copying 50 images per class...")
for class_folder in os.listdir(source_dir):
    class_path = os.path.join(source_dir, class_folder)
    if os.path.isdir(class_path):
        dest_class_path = os.path.join(dest_dir, class_folder)
        if not os.path.exists(dest_class_path):
            os.makedirs(dest_class_path)
        
        images = [img for img in os.listdir(class_path) if img.endswith(('.jpg', '.JPG', '.png', '.jpeg'))]
        # Take up to 50 images per class
        for img_name in images[:50]:
            src = os.path.join(class_path, img_name)
            dst = os.path.join(dest_class_path, img_name)
            shutil.copy2(src, dst)
            
print("Dataset subset copied successfully.")
