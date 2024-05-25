import streamlit as st
import time

# Placeholder URL for image generation and target image
PLACEHOLDER_URL = "https://strikingloo.github.io/resources/ai-generated-images/dalle_2/DALL_E_2022-08-16_17.50.53_-_An_oil_painting_of_a_mechanical_clockwork_flying_machine_from_the_renaissance,_Gorgeous_digital_painting,_amazing_art,_artstation_3,_realistic.png"
N_ROUND = 2
NAMES = ['ley', 'tom']

# Initialize session state
if "current_round" not in st.session_state:
    st.session_state.current_round = 0
if "player_turn" not in st.session_state:
    st.session_state.player_turn = 'ley'
if "results" not in st.session_state:
    st.session_state.results = {i: {'ley': {'image': None, 'prompt': None}, 'tom': {'image': None, 'prompt': None}} for i in range(N_ROUND)}

# Simulate an API call to generate an image
def generate_image(prompt):
    time.sleep(2)  # Simulate time delay for image generation
    return PLACEHOLDER_URL

# Define the layout
st.title("Multiplayer Image Generation Game")

# Target Image Display
st.header("Target Image")
st.image(PLACEHOLDER_URL)

# Player Names
col1, col2 = st.columns(2)
with col1:
    st.text(NAMES[0])
with col2:
    st.text(NAMES[1])

# Display game state in rows
for round_num in range(st.session_state.current_round):
    col1, col2 = st.columns(2)
    with col1:
        image = st.session_state.results[round_num]['ley']['image']
        prompt = st.session_state.results[round_num]['ley']['prompt']
        st.write(prompt)
        if not image:
            st.write("Loading...")
        else:
            st.image(image)
    with col2:
        image = st.session_state.results[round_num]['tom']['image']
        prompt = st.session_state.results[round_num]['tom']['prompt']
        st.write(prompt)
        if not image:
            st.write("Loading...")
        else:
            st.image(image)

# Text input for image generation
prompt = st.text_input("Enter a prompt to generate an image:", key="prompt")
if st.button("Send") and prompt:
    st.session_state.loading = True
    current_round = st.session_state.current_round
    player_turn = st.session_state.player_turn

    # Update the results dictionary
    st.session_state.results[current_round][player_turn]['prompt'] = prompt
    st.session_state.results[current_round][player_turn]['image'] = "loading"

    # Simulate image generation
    new_image = generate_image(prompt)
    st.session_state.results[current_round][player_turn]['image'] = new_image

    # Update the player turn and current round
    if player_turn == 'ley':
        st.session_state.player_turn = 'tom'
    else:
        st.session_state.player_turn = 'ley'
        st.session_state.current_round += 1

    st.session_state.loading = False

# # Display the current round images
# if st.session_state.current_round < N_ROUND:
#     col1, col2 = st.columns(2)
#     with col1:
#         if st.session_state.results[st.session_state.current_round]['ley']['image'] == "loading":
#             st.write("Loading...")
#         elif st.session_state.results[st.session_state.current_round]['ley']['image']:
#             st.image(st.session_state.results[st.session_state.current_round]['ley']['image'])
#     with col2:
#         if st.session_state.results[st.session_state.current_round]['tom']['image'] == "loading":
#             st.write("Loading...")
#         elif st.session_state.results[st.session_state.current_round]['tom']['image']:
#             st.image(st.session_state.results[st.session_state.current_round]['tom']['image'])

st.write("Game state:", st.session_state)
