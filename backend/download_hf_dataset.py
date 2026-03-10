import os
from datasets import load_dataset

def download_and_save_dataset():
    # Load the plant village dataset (only a slice to speed up training, maybe 3000 images)
    print("Loading HuggingFace dataset...")
    try:
        # Some HuggingFace datasets allow streaming or partial loading. 
        # Alternatively, we can load a smaller one: "taesiri/PlantVillage"
        ds = load_dataset("taesiri/PlantVillage", split="train[:3000]")
    except Exception as e:
        print(f"Failed to load dataset: {e}")
        return

    output_dir = "dataset"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print("Saving dataset to disk...")
    # Labels usually come as integers or strings depending on the dataset.
    # In taesiri/PlantVillage, there is 'label' (int) and we need the int2str mapping.
    labels_feature = ds.features['label']
    
    for i, item in enumerate(ds):
        img = item['image']
        label_id = item['label']
        label_name = labels_feature.int2str(label_id)
        
        # Format folder name
        label_name = label_name.replace(" ", "_").replace("/", "_")
        class_dir = os.path.join(output_dir, label_name)
        if not os.path.exists(class_dir):
            os.makedirs(class_dir)
            
        # Convert to RGB (in case of RGBA/L)
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        img_path = os.path.join(class_dir, f"img_{i}.jpg")
        img.save(img_path)
        
    print(f"Saved {len(ds)} images into '{output_dir}'.")

if __name__ == "__main__":
    download_and_save_dataset()
