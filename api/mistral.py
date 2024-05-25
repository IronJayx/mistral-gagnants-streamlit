from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
import os


def llm_judge(original_description, user1_description, user2_description):
    IMPROVED_JUDGE_PROMPT = f"""
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

    model = "mistral-large-latest"
    api_key = os.environ.get("MISTRAL_API_KEY")
    client = MistralClient(api_key=api_key)

    chat_response = client.chat(
        model=model,
        messages=[ChatMessage(role="user", content=IMPROVED_JUDGE_PROMPT)]
    )

    return chat_response.choices[0].message.content
