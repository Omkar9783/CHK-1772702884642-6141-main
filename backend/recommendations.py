from deep_translator import GoogleTranslator
import time

def translate_recommendations(data: dict, target_lang: str) -> dict:
    if target_lang == 'en':
        return data
        
    translator = GoogleTranslator(source='en', target=target_lang)
    translated_data = {}
    
    # Define keys that need translation
    translatable_keys = ["disease_name", "symptoms", "cause"]
    list_keys = ["biological", "chemical", "preventive"]
    
    for key, value in data.items():
        if key in translatable_keys:
            try:
                time.sleep(0.05)
                translated_data[key] = translator.translate(value)
            except:
                translated_data[key] = value
        elif key in list_keys:
            translated_list = []
            for item in value:
                try:
                    time.sleep(0.05)
                    translated_list.append(translator.translate(item))
                except:
                    translated_list.append(item)
            translated_data[key] = translated_list
        else:
            translated_data[key] = value
            
    return translated_data

def get_recommendations(disease_label: str, lang: str = 'en') -> dict:
    """
    Returns specific, structured recommendations based on the disease category.
    Includes symptoms, cause, and specific treatment options.
    """
    disease_lower = disease_label.lower()
    
    # Default data for healthy plants
    if "healthy" in disease_lower:
        data = {
            "disease_name": "Healthy",
            "symptoms": "The plant shows no visible signs of stress or disease. Leaves are green and vibrant.",
            "cause": "Ideal growing conditions and proper care.",
            "biological": ["No biological treatment needed.", "Continue using organic compost."],
            "chemical": ["No chemical treatment needed.", "Optional: Apply balanced NPK (19:19:19) for growth."],
            "preventive": ["Maintain crop rotation.", "Ensure proper spacing for air circulation."]
        }
    
    # Viral Diseases
    elif any(v in disease_lower for v in ["virus", "curl", "mosaic"]):
        data = {
            "disease_name": "Viral Infection",
            "symptoms": "Yellowing of leaves, stunted growth, curling or wrinkling of foliage, and mosaic-like patterns.",
            "cause": "Viruses primarily transmitted by sap-sucking insects like aphids and whiteflies.",
            "biological": ["Use Neem Oil (1500 PPM) to control insect vectors.", "Introduce ladybugs to eat aphids."],
            "chemical": ["Apply Imidacloprid (Bayer Confidor) to control vectors.", "Use Thiamethoxam (Actara) for rapid whitefly control."],
            "preventive": ["Plant virus-resistant varieties.", "Install insect nets in greenhouses.", "Quickly rogue and destroy infected plants."]
        }
        
    # Bacterial Diseases
    elif "bacterial" in disease_lower or "haunglongbing" in disease_lower:
        data = {
            "disease_name": "Bacterial Infection",
            "symptoms": "Water-soaked spots on leaves that turn brown or black, often with a yellow halo.",
            "cause": "Bacteria spreading through water splashes, contaminated tools, or wind-blown rain.",
            "biological": ["Apply Copper Oxychloride (Blitox 50) as it has bactericidal properties.", "Improve field drainage."],
            "chemical": ["Use Streptomycin sulfate (Plantomycin) sprays.", "Apply fixed copper fungicides to prevent further spread."],
            "preventive": ["Disinfect farm tools regularly.", "Avoid overhead irrigation.", "Source certified disease-free seeds."]
        }

    # Pests (Mites, Insects)
    elif "mites" in disease_lower or "spider_mites" in disease_lower:
        data = {
            "disease_name": "Pest Infestation (Mites)",
            "symptoms": "Fine silvery webbing on leaves, yellow stippling (dots), and leaf drop.",
            "cause": "Spider mites thriving in hot, dry conditions with low humidity.",
            "biological": ["Blast plant with high-pressure water stream.", "Apply Insecticidal soap.", "Release Phytoseiulus persimilis (predatory mites)."],
            "chemical": ["Apply Spiromesifen (Bayer Oberon).", "Use Hexythiazox or Abamectin as specialized miticides."],
            "preventive": ["Keep plants well-hydrated.", "Increase humidity around the crop.", "Regular scouting for early detection."]
        }

    # Fungal Diseases (Everything else)
    else:
        # We can extract the specific name for better display if not one of the above
        display_name = disease_label.replace("___", " ").replace("_", " ")
        data = {
            "disease_name": display_name,
            "symptoms": "Visible fungal growth (mold/mildew), dark spots, wilting, or necrotic areas on leaves.",
            "cause": "Fungal spores spreading via air, soil or water, often in humid weather.",
            "biological": ["Use Bacillus subtilis based bio-fungicides.", "Apply Sulfur dust or Potassium Bicarbonate sprays."],
            "chemical": ["Apply Azoxystrobin (Amistar) or Tebuconazole.", "For deep infections, use systemic fungicides like Ridomil Gold."],
            "preventive": ["Ensure proper plant spacing.", "Remove and burn old crop residues.", "Apply preventive Mancozeb sprays during monsoon."]
        }
        
    return translate_recommendations(data, lang)
