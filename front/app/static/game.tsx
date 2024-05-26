interface Game {
    id: string;
    url: string;
    prompt: string
}

interface Player {
    id: string;
    name: string;
}

export const games = [
    {
      id: "Generate an event Mascot",
      url: "https://media.discordapp.net/attachments/1243124066324582475/1244201003570561106/file-l214r0JPdvxpDvszLf1tmqEr.png?ex=66543ffb&is=6652ee7b&hm=81c4602c3c3062c758eee0fa944a93e879ca721ad96e4c37ef0870396bd7ffab&=&format=webp&quality=lossless&width=393&height=393",
      prompt: "A mascot for Mistral AI Hackathon, which is happy and studious. The mascot should be lively, appealing to hackers and broad people of all generation.\nThe mascot is a realistic animal, with red, orange and yellow colors separated by blocks, including fluffy hair.\nThe art style is realistic and pixelated (only the mascot). The background is a big place with high ceiling with plants and books and meeting rooms.",
      prompt_header: "Best practice for prompting a mascot:",
      promt_best_practice: "Define the Brand Identity.\nCharacter Traits.\nAppearance Details.\nPose and Action.\nStyle and Aesthetic.\nBackground and Environment."
    },
    {
      id: "Generate a game asset",
      url: "https://strikingloo.github.io/resources/ai-generated-images/dalle_2/DALL_E_2022-08-16_17.49.06_-_Pixar_style_3D_render_of_a_baby_hippo,_4k,_high_resolution,_trending_in_artstation.png",
      prompt: 'Pixar style baby hippo'
    },
    {
      id: "Generate a painting",
      url: "https://strikingloo.github.io/resources/ai-generated-images/dalle_2/DALL_E_2022-08-16_17.50.50_-_An_oil_painting_of_a_mechanical_clockwork_flying_machine_from_the_renaissance,_Gorgeous_digital_painting,_amazing_art,_artstation_3,_realistic.png",
      prompt: 'oil painting of a mechanical clockwork flying machine'
    }
  ];
  

export const players: Player[] = [
    {
        id: "1",
        name: "Player 1"
    },
    {
        id: "2",
        name: "Player 2"
    }
];
