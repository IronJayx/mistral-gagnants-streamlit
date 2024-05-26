from openai import OpenAI
import replicate

class DALLEVision:
    def __init__(self):
        self.client = OpenAI()

    def generate_image_from_prompt(self, prompt):
        input = {
            "prompt": prompt,
            "scheduler": "K_EULER"
        }
        output = replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            input=input
        )
        return output[0]


    def get_descriptor_from_image_url(self, image_url):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text",
                         "text": "Describe this image in a very detailed and objective manner. Talk about the objects, colors, styles and ambiance you see. "},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url
                            },
                        },
                    ],
                }
            ],
            max_tokens=400,
        )

        return response.choices[0].message.content

