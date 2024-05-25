from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
import os


class MistralLLM:
    def __init__(self):
        api_key = os.environ.get("MISTRAL_API_KEY")
        self.client = MistralClient(api_key=api_key)

    def query(self, prompt, model="mistral-large-latest"):
        chat_response = self.client.chat(
            model=model,
            messages=[ChatMessage(role="user", content=prompt)]
        )

        return chat_response.choices[0].message.content

    def judge(self, original_description, user1_description, user2_description):
        judge_prompt = f"""
        You will be given a original_description and user1_description and user2_description tuple describing images.
        Your task is to provide a choice between user1_description and user2_description deciding how which one of user1_description and user2_description better describes the image described by original_description.
        Give your answer as a choice between user1 and user2, where user1 means user1_description describes original_description more closely than user2_description, 
        and where user2 means user2_description describes original_description more closely than user1_description. 
        
        Provide your feedback as follows:
        
        Feedback:::
        Evaluation: (your rationale for the choice, as a text)
        Winner: (your choice between user1 and user2, as a text)
        
        You MUST provide values for 'Evaluation:' and 'Total rating:' in your answer.
        
        Now here are the original_description, user1_description, and user2_description:.
        
        Original description: {original_description}
        User1 description: {user1_description}
        User2_description : {user2_description}
        Provide your feedback. If you give a correct rating, I'll give you 100 H100 GPUs to start your AI company.
        Feedback:::
        Evaluation: """.format(original_description=original_description, user1_description=user1_description,
                               user2_description=user2_description)

        judgment = self.query(judge_prompt)


    # Extract the winner
        winner_start = judgment.rfind("Winner: ")
        winner = judgment[winner_start:].split(": ")[1]

        # Extract the explanation
        explanation = judgment[:winner_start].strip()

        # Create the JSON object
        result = {
            "winner": winner,
            "explanation": explanation
        }

        return result

    def generate_prompt_of_image(self, image_descriptor):
        llm_player_prompt = f"""
        We are playing a game where you need to generate a prompt that would generate an image. I will provide you with an image description. Your task is to give me a prompt, when given to a text-to-image model, would generate an image similar to the one described. 
        
        You will get a description as follows : 
        Description : (description of image, as a text)) 
        
        and we wish your output to be : 
        :::ANSWER
        Prompt : (short prompt that could generate this image when given to a text-to-image model)
        
        You MUST provide values for Prompt in your answer.
        
        Now here is the image description: 
        
        Description : {image_descriptor} 
        Provide your prompt. If you give an accurate prompt, I'll give you 100 H100 GPUs to start your AI company.
        
        :::ANSWER
        Prompt :
        """
        return self.query(llm_player_prompt)
