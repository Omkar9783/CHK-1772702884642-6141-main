import tensorflow as tf
from tensorflow.keras.applications import EfficientNetV2B0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import Model

def create_model(num_classes, fine_tuning=False):
    """
    Creates a CNN model based on EfficientNetV2B0 for transfer learning.
    EfficientNetV2 is generally more accurate and faster than original EfficientNet/MobileNet.
    """
    base_model = EfficientNetV2B0(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    if not fine_tuning:
        # Initial training: Freeze the entire base model
        base_model.trainable = False
    else:
        # Fine-tuning: Unfreeze the top layers of the base model
        base_model.trainable = True
        # Freeze all layers except the last 20
        for layer in base_model.layers[:-20]:
            layer.trainable = False
    
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.3)(x)
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    learning_rate = 1e-3 if not fine_tuning else 1e-5
    
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate), 
                  loss='categorical_crossentropy', 
                  metrics=['accuracy'])
    return model

if __name__ == "__main__":
    # Mock class count for testing initialization
    model = create_model(38) # PlantVillage has 38 classes
    model.summary()
