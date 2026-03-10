import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from model import create_model

# Dataset: PlantVillage (https://www.kaggle.com/datasets/emmareid/plantvillage-dataset)
# Note: You will need the Kaggle API key (kaggle.json) present in your ~/.kaggle folder.

DATASET_NAME = "emmareid/plantvillage-dataset"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 3

def prepare_data(data_dir):
    """
    Prepares training and validation data generators with augmentation.
    """
    datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        validation_split=0.2,
        fill_mode='nearest'
    )
    
    train_gen = datagen.flow_from_directory(
        data_dir,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )
    
    val_gen = datagen.flow_from_directory(
        data_dir,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )
    
    return train_gen, val_gen

def train():
    # 1. Download dataset if it doesn't exist
    if not os.path.exists("dataset"):
        print("Copying a subset of real PlantVillage dataset...")
        os.system("python copy_subset.py")
    
    # 2. Prepare data
    train_gen, val_gen = prepare_data("dataset")
    num_classes = train_gen.num_classes
    
    # 3. Create model
    model = create_model(num_classes)
    
    # 4. Train
    model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS
    )
    
    # 5. Save model
    model.save("crop_disease_model.h5")
    
    # 6. Save labels for reference
    with open("labels.txt", "w") as f:
        labels = list(train_gen.class_indices.keys())
        for label in labels:
            f.write(label + "\n")
    print("Training complete! Model saved as crop_disease_model.h5")

if __name__ == "__main__":
    train()
