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
      id: "1",
      url: "https://media.discordapp.net/attachments/1243124066324582475/1243856079926853682/image.png?ex=6652febf&is=6651ad3f&hm=5c70007399f4e30ffdfe2a3d2cb8b76d196f166f911b7dd52e9da5a7dd01d30b&=&format=webp&quality=lossless&width=570&height=564",
      prompt: 'formula 1'
    },
    {
      id: "2",
      url: "https://strikingloo.github.io/resources/ai-generated-images/dalle_2/DALL_E_2022-08-16_17.49.06_-_Pixar_style_3D_render_of_a_baby_hippo,_4k,_high_resolution,_trending_in_artstation.png",
      prompt: 'Pixar style baby hippo'
    },
    {
      id: "3",
      url: "https://strikingloo.github.io/resources/ai-generated-images/dalle_2/DALL_E_2022-08-16_17.50.50_-_An_oil_painting_of_a_mechanical_clockwork_flying_machine_from_the_renaissance,_Gorgeous_digital_painting,_amazing_art,_artstation_3,_realistic.png",
      prompt: 'oil painting of a mechanical clockwork flying machine'
    }
  ];
  

export const players: Player[] = [
    {
        id: "1",
        name: "Joe"
    },
    {
        id: "2",
        name: "Joelle"
    }
];
