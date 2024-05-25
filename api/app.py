from fastapi import FastAPI,  HTTPException, Request
from mistral import MistralLLM
from dalle import DALLEVision
import uvicorn
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
mistral = MistralLLM()
dalle = DALLEVision()


@app.post("/generate_image")
async def generate_image(request: Request):
    data = await request.json()
    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    image_url = dalle.generate_image_from_prompt(prompt)
    return {"url": image_url}

@app.post("/compare_images")
async def compare_images(request: Request):
    data = await request.json()
    original_image_url = data.get("original_image_url")
    image1_url = data.get("image1_url")
    image2_url = data.get("image2_url")

    if not image1_url or not image2_url:
        raise HTTPException(status_code=400, detail="Both image1_url and image2_url are required")
    descriptor_1 = dalle.get_descriptor_from_image_url(image1_url)
    descriptor_2 = dalle.get_descriptor_from_image_url(image2_url)
    judgement = mistral.judge(original_image_url, descriptor_1, descriptor_2)
    return judgement

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)