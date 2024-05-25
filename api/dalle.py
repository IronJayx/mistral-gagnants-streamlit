from openai import OpenAI

class DALLEVision:
    def __init__(self):
        self.client = OpenAI()

    def generate_image_from_prompt(self, prompt):
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url


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

