import os
# Fix for macOS TensorFlow issues (mutex lock failed / duplicate library)
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

import tensorflow as tf
from model import create_model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from tensorflow.keras import layers

# Paths
base_dir = '/Users/omkarpanchal/Downloads/CHK-1772702884642-6141-main/CHK-1772702884642-6141-main/backend/archive-2/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)'
train_dir = os.path.join(base_dir, 'train')
valid_dir = os.path.join(base_dir, 'valid')

# Image parameters
img_height = 224
img_width = 224
batch_size = 32

# Load Datasets using the more modern image_dataset_from_directory (Keras 3 preferred)
print("Loading datasets...")
train_ds = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=(img_height, img_width),
    batch_size=batch_size,
    label_mode='categorical'
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    valid_dir,
    image_size=(img_height, img_width),
    batch_size=batch_size,
    label_mode='categorical'
)

# Get number of classes immediately after loading
class_names = train_ds.class_names
num_classes = len(class_names)
print(f"Number of classes: {num_classes}")

# Robust Data Augmentation as a preprocessing layer
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.2),
    layers.RandomZoom(0.2),
    layers.RandomTranslation(0.1, 0.1),
    layers.RandomBrightness(0.1),
])

# Apply augmentation to the training set
# Note: EfficientNetV2B0 handles its own preprocessing/scaling internally,
# so we pass the raw pixel values [0, 255].
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.map(lambda x, y: (data_augmentation(x, training=True), y), num_parallel_calls=AUTOTUNE)
val_ds = val_ds.map(lambda x, y: (x, y), num_parallel_calls=AUTOTUNE)

# Optimize performance
train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# --- STAGE 1: Train Top Layers ---
print("--- Stage 1: Training Top Layers ---")
model = create_model(num_classes, fine_tuning=False)

callbacks = [
    EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True),
    ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=2, min_lr=1e-6),
    ModelCheckpoint('best_model_weights.weights.h5', save_best_only=True, save_weights_only=True)
]

history1 = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=5,
    callbacks=callbacks
)

# --- STAGE 2: Fine-Tuning ---
print("--- Stage 2: Fine-Tuning ---")
# Reload weights and unfreeze top layers
model = create_model(num_classes, fine_tuning=True)
# Load weights from stage 1
model.load_weights('best_model_weights.weights.h5')

history2 = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=10,
    callbacks=callbacks
)

# Save Final Model
model.save('crop_disease_model_new.h5')
print("Model saved to crop_disease_model_new.h5")

# Save class labels
with open('labels_new.txt', 'w') as f:
    for label in class_names:
        f.write(f"{label}\n")
print("Labels saved to labels_new.txt")

