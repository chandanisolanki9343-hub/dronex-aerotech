from PIL import Image

screenshot_path = "C:/Users/Ghans/.gemini/antigravity-ide/brain/d0ec4c63-2e4a-4310-8967-2232f5df7b4b/media__1782489977372.png"
output_path = "c:/Users/Ghans/OneDrive/Desktop/Dronex/backend/jet-bg.png"

try:
    img = Image.open(screenshot_path).convert("RGB")
    width, height = img.size
    print(f"Original size: {width}x{height}")

    # Restrict scan to y=150 to y=850 to ignore status bar and bottom buttons
    non_black_rows = []
    for y in range(150, 850):
        has_color = False
        for x in range(0, width, 5):
            r, g, b = img.getpixel((x, y))
            if r > 10 or g > 10 or b > 10:
                has_color = True
                break
        if has_color:
            non_black_rows.append(y)

    if not non_black_rows:
        print("Could not find any non-black rows. Using default dimensions.")
        start_y = 380
        end_y = 640
    else:
        start_y = min(non_black_rows)
        end_y = max(non_black_rows)
        print(f"Detected jet plane range: y = {start_y} to {end_y}")

    # Crop the image
    cropped_img = img.crop((0, start_y, width, end_y + 1))
    cropped_img.save(output_path)
    print(f"Saved cropped image to {output_path} with size: {cropped_img.size}")

except Exception as e:
    print(f"Error occurred: {e}")
