from PIL import Image

def crop_logo():
    logo_path = "c:/Users/Ghans/OneDrive/Desktop/Dronex/frontend/public/logo.png"
    img = Image.open(logo_path)
    
    # Convert to grayscale to find bounding box easily
    gray = img.convert("L")
    
    # getbbox returns the bounding box of non-zero (non-black) pixels
    # Since background might not be exactly (0,0,0) in some compressions,
    # let's threshold it: set pixels < 15 to 0 (pure black)
    threshold = 15
    thresholded = gray.point(lambda p: p if p > threshold else 0)
    
    bbox = thresholded.getbbox()
    if bbox:
        # Add 5px padding around the logo so it has a tiny margin
        w, h = img.size
        left = max(0, bbox[0] - 5)
        top = max(0, bbox[1] - 5)
        right = min(w, bbox[2] + 5)
        bottom = min(h, bbox[3] + 5)
        
        cropped_img = img.crop((left, top, right, bottom))
        cropped_img.save(logo_path)
        print(f"Successfully cropped logo from {img.size} to {cropped_img.size}")
    else:
        print("Logo is entirely black or couldn't calculate bbox.")

if __name__ == "__main__":
    crop_logo()
