from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from mistral import MistralLLM
from dalle import DALLEVision
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mistral = MistralLLM()
dalle = DALLEVision()


@app.post("/generate_image")
async def generate_image(request: Request):
    data = await request.json()
    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    image_url = dalle.generate_image_from_prompt_dalle(prompt)
    return {"url": image_url}


@app.post("/compare_images")
async def compare_images(request: Request):
    data = await request.json()

    original_image_url = data.get("original_image_url")
    image1_url = data.get("image1_url")
    image2_url = data.get("image2_url")

    print(original_image_url)
    print(image1_url)
    print(image2_url)

    if not image1_url or not image2_url:
        raise HTTPException(status_code=400, detail="Both image1_url and image2_url are required")
    original_image_descriptor = dalle.get_descriptor_from_image_url(original_image_url)
    descriptor_1 = dalle.get_descriptor_from_image_url(image1_url)
    judgment_1 = mistral.feedback_individuel(original_image_descriptor, descriptor_1)
    descriptor_2 = dalle.get_descriptor_from_image_url(image2_url)
    judgment_2 = mistral.feedback_individuel(original_image_descriptor, descriptor_2)
    comparison = mistral.judge_compare(original_image_url, descriptor_1, descriptor_2)

    final_json = {
        "scores": [judgment_1['score'], judgment_2['score']],
        "feedback": [judgment_1['feedback'], judgment_2['feedback']],
        "winner": int(comparison['winner'] == "user1"),
        "explanation": comparison['explanation']
    }
    return final_json


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
