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

    def judge_compare(self, original_description, user1_description, user2_description):
        judge_prompt = f"""
        You will be given a original description and user1 description and user2 description tuple describing images.
        Your task is to provide a choice between user1 description and user2 description deciding how which one of user1 description and user2 description better describes the image described by original_description.
        Give your answer as a choice between user1 and user2, where user1 means user1 description describes original description more closely than user2 description, 
        and where user2 means user2 description describes original description more closely than user1 description. 
        
        Provide your feedback as follows:
        
        Feedback:::
        Evaluation: (your rationale for the choice, as a text)
        Winner: (your choice between user1 and user2, as a text)
        
        You MUST provide values for 'Evaluation:' and 'Score:' in your answer.
        
        Now here are the original description, user1 description, and user2 description:.
        
        Original description: {original_description}
        User1 description: {user1_description}
        User2 description : {user2_description}
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

    def feedback_individuel(self, original_description, user_description):
        feedback_prompt = f"""
        You will be given a original prompt and user prompt couple describing images.
        Your task is to provide a 'Score' scoring how well the user prompt resembles the original prompt and give feedback to the user.
        Give your answer on a scale of 1 to 4, where 1 means that the user prompt is describing a totally different image from the one described by original prompt, and 4 means that user prompt is perfectly describing the image described by original prompt.
        
        Here is the scale you should use to build your answer:
        1: The user prompt is terrible: completely different from the image described by original prompt, or very partial
        2: The user prompt is mostly not similar: misses some key aspects of the image described by original prompt
        3: The user prompt is mostly similar: describes a similar image to the one described by original prompt, but still could be improved
        4: The user prompt is excellent: relevant, direct, detailed, and addresses all aspects described in original prompt

        Provide your output as follows:
        
        - Feedback: (your rationale for the rating and feedback, as a short text of 10 words maximum, list keywords and concepts that user could add)
        - Score: (your rating, as a floating point number between 1 and 4)
        
        You MUST provide values for 'Feedback:' and 'Score:' in your answer.

        Additinal guidelines for feedback:
        - It should be addressed to the user in order to teach him, be nice and gentle, so be constructive, and address the user directly using "you".
        - DONT start your feedback with: The user prompt... BUT SAY Your prompt...
        - Feedback should be max 20 words, dont have to make sentences you can output a list of key concepts and themes
        - DONT include additional feedback after Score.
        
        Now here are the original prompt and user prompt.
        
        Original prompt: {original_description}
        User prompt: {user_description}
        
        Provide your output. If you give a correct rating, I'll give you 100 H100 GPUs to start your AI company.
        - Feedback:
        - Score:
        """.format(original_description=original_description, user_description=user_description)

        response = self.query(feedback_prompt)

        print(response)

        rating_start = response.rfind("- Score: ")
        rating = response[rating_start:].split(": ")[1]

        # Extract the explanation
        explanation = response[:rating_start].strip().replace("- Feedback:", "")

        # Create the JSON object
        result = {
            "score": rating,
            "feedback": explanation
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
