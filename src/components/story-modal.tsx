import Image from 'next/image';
import React from 'react';

interface Story {
  id: number;
  story: {
    type: 'text' | 'image';
    value: string;
  }[];
}

interface StoryModalProps {
  userLevel: number;
  onClose: () => void;
}

const story = [
    {
      id: 0,
      story: [
        { type: 'text', value: 'Deep in the Middle Ages, there was a small village hidden among great forests and steep mountains. This village was called the Village of Shadows. The village took its name from the dark forests surrounding it. While the villagers continued their daily lives, they were always on alert for dangers that could come from the outside world. However, the peace in the village was constantly disrupted by four major threats: a bandit gang, a crazy farmer who used his scarecrow like a puppet, a goblin gang, and the goblin leader.' },
        { type: 'text', value: 'There was a young adventurer named Aris living in the village. Aris was brave and determined. He lost his parents at a young age and was raised by the village people. His love for his village and his desire to protect it made him a strong and skilled warrior.' },
    ]
    },
    {
      id: 1,
      story: [
        { type: 'text', value: 'Chapter 1: The Bandit Gang' },
        { type: 'image', value: '/story/1.jpg'},
        { type: 'text', value: 'The Village of Shadows was once a small settlement that lived in peace and tranquility. However, recently, a bandit gang near the village had started ambushing villagers on the paths and stealing their goods. The villagers were increasingly frightened and hesitant to leave their homes. The bandits had created chaos in the village and drove the people into deep anxiety.' },
        { type: 'text', value: 'Aris noticed this unrest in the village and decided to take action as he could no longer bear seeing the villagers suffer. He gathered information about the bandit gang’s hideout from the village elder Elara. Elara told him that the bandits were hiding in an abandoned house at the edge of the forest and were attacking the village from there.' },
        { type: 'text', value: 'After completing his preparations, Aris set out towards the forest. When he reached the edge of the forest, he started searching for traces of the abandoned house. He saw that the house was dilapidated and almost completely covered with trees. He noticed the traces of the bandits around the house. After carefully tracking for a few days, he reached the house where the bandits were hiding.' },
        { type: 'text', value: 'Observing the house carefully, Aris realized how orderly the bandits were inside the house and that they constantly sent out scouts. He studied the routines of the bandits patrolling around the house and tried to learn their weaknesses. He decided to take action during the night when the guards changed.' },
        { type: 'image', value: '/story/2.jpg'},
        { type: 'text', value: 'At midnight, when it was time for the guards to change, Aris quietly moved towards the house. He neutralized the bandits at the entrance without attracting attention. When he entered, he saw that the bandits were gathered in a large room and were sharing the loot. Each one held a weapon, and their eyes shone with greed.' },
        { type: 'text', value: 'Aris quietly moved to the edge of the room and watched the bandits from a hiding place. The bandit leader was sitting at a large table in the center, barking orders to his gang. Aris made a plan to distract the leader and neutralize the gang.' },
        { type: 'text', value: 'Aris slowly knocked over a large candlestick in the room, making a noise. The bandits jumped at the sudden sound and started looking around to see what was happening. In this moment of confusion, Aris quickly moved towards the leader. He approached the leader by neutralizing his guards. When the bandit leader noticed Aris, he stood up in a rage and swung his sword.' },
        { type: 'text', value: 'Aris swiftly dodged the leader’s attacks. The leader’s blows were strong but slow. Aris used his agility to target the leader’s weak points. After a few strategic moves, he managed to unbalance the leader and brought him to the ground.' },
        { type: 'text', value: 'With the leader down, the other bandits started to flee in panic. Before leaving the room, Aris gathered all the valuable items and the villagers’ stolen goods. While the bandits were fleeing, Aris quickly chased after them and neutralized them one by one. Following the direction in which the bandits fled, he caught up with them outside the house and neutralized them all.' },
        { type: 'text', value: 'After neutralizing the bandits and recovering the villagers’ goods, Aris returned to the village. The villagers were greatly impressed by Aris’s courage and heroism. They welcomed him with great enthusiasm and celebrated with the joy of being rid of the bandits. Aris was filled with the pride of protecting his village and was happy to have ensured the villagers lived in peace.' },
        { type: 'text', value: 'However, Aris knew that this victory was just the beginning. The Village of Shadows would always offer him new adventures, and he would always be ready to protect his village. Aris’s courage and determination brought peace back to the Village of Shadows.' },
      ]
    },
    {
      id: 2,
      story: [
        { type: 'text', value: 'Chapter 2: The Crazy Farmer and His Scarecrow' },
        { type: 'image', value: '/story/3.jpg'},
        { type: 'text', value: 'After defeating the bandit gang, there was peace in the village for a while. However, one morning, the villagers gathered in the village square and came to Aris with a new problem. The crazy farmer Haran was using his scarecrow like a puppet to harm the villagers. The scarecrow was attacking the villagers’ homes and ruining their fields at night.' },
        { type: 'text', value: 'Aris decided to investigate the situation and went to Haran’s field. At the entrance to the field, Aris felt a magical aura surrounding Haran’s field. Haran had been working in his field for a long time, but no one paid much attention to what he was doing. When Aris approached Haran’s house, he heard strange prayers and spells from inside.' },
        { type: 'text', value: 'Aris quietly entered and saw Haran casting spells among old, dusty books. When he took one of the books and examined it, he realized that Haran was controlling the scarecrow using dark magic. Haran had resorted to black magic to get more yield from his field, and in the end, he had lost his mind due to the effects of these spells.' },
        { type: 'image', value: '/story/4.jpg'},
        { type: 'text', value: 'Aris decided to consult the village elder Elara. Elara prepared a special potion for Aris to break the spell. At midnight, Aris went to Haran’s field again. The scarecrow, under Haran’s command, attacked Aris, but Aris managed to avoid it with agile movements and poured Elara’s potion over the scarecrow. The scarecrow paused for a moment and then slowly collapsed to the ground.' },
        
        { type: 'text', value: 'Haran, seeing his spell broken, attacked Aris in rage. Aris subdued Haran and brought him back to the village. The villagers imprisoned Haran in a place where he could no longer harm anyone. The scarecrow turned back into a normal pile of straw. Once again, the village breathed a sigh of relief thanks to Aris’s bravery.' },
      ]
    },
    {
      id: 3,
      story: [
        { type: 'text', value: 'Chapter 3: The Goblin Gang' },
        { type: 'image', value: '/story/5.jpg'},
        { type: 'text', value: 'Shortly after the threat of Haran was eliminated, a new danger appeared in the village. Goblins from the forest started stealing the villagers’ food and goods. The Village of Shadows was plunging into greater chaos with each passing day. The goblins, despite their small size, were very fast and agile, making them difficult to catch.' },
        { type: 'text', value: 'Aris immediately took action to stop the goblin gang. As he moved deeper into the forest, he carefully followed the goblins’ tracks. Goblins usually attacked at midnight, so Aris stayed vigilant throughout the night. Among the dark and dense vegetation of the forest, he found a cave hidden away. The entrance to the cave was filled with tools used by the goblins. Aris realized that the cave was the goblins’ hideout.' },
        { type: 'text', value: 'Aris made a plan to sneak into the cave. When he reached the entrance of the cave, he sneaked inside without alerting the goblin guards. As he advanced through the dark corridors of the cave, he heard the goblins’ high-pitched laughter and conversations. As Aris carefully observed, he realized how organized the goblins were. Each one was performing a task, exchanging information quickly among themselves.' },
        { type: 'text', value: 'As he descended deeper into the cave, he saw an increase in the number of goblins. Aris continued to observe them from his hiding place. The goblins had a large area where they gathered the stolen goods and food. This area looked like a treasure room, with bags of food, gold, and valuable items belonging to the villagers everywhere.' },
        { type: 'text', value: 'Determined to put an end to this situation, Aris began to silently take out the goblins one by one. Each move was silent and swift. The goblins fell one by one before they could understand what was happening. However, a loud noise from deep within the cave caught Aris’s attention. This signaled the arrival of one of the largest and most powerful members of the goblins, the Black Goblin.' },
        { type: 'text', value: 'The Black Goblin was much larger and stronger than the others. He held a massive club and looked like the leader of the cave. Aris prepared to face him. The rest of the goblins gathered behind the Black Goblin, supporting him.' },
        { type: 'image', value: '/story/6.jpg'},
        { type: 'text', value: 'Aris stepped forward to challenge the Black Goblin. The Black Goblin laughed mockingly at Aris and swung his club threateningly. Aris moved quickly to avoid the Black Goblin’s attacks. The Black Goblin struck with heavy but powerful blows. Aris used his agility and swordsmanship to attack the Black Goblin.' },
        { type: 'text', value: 'The Black Goblin struggled against Aris’s agility. Aris targeted the Black Goblin’s weak points with strategic moves. After a few strikes, Aris managed to unbalance the Black Goblin and brought him to the ground. The Black Goblin let out a scream that echoed through the cave and collapsed.' },
        { type: 'text', value: 'Seeing their leader defeated, the goblins panicked. They started to flee in fear, but Aris was determined not to give them another chance. He quickly caught the fleeing goblins, neutralizing them and clearing the cave. Aris gathered the goods and food the goblins had stolen from the villagers and returned to the village.' },
        { type: 'text', value: 'In the village, Aris was greeted with great enthusiasm. The villagers were grateful to Aris for eliminating the goblin threat. Aris was filled with the pride of protecting his village, but he also knew that new adventures awaited him. Thanks to Aris’s courage and determination, the Village of Shadows was now a safer place.' },
      ]
    },
    {
      id: 4,
      story: [
        { type: 'text', value: 'Chapter 4: The Ogre Leader' },
        { type: 'image', value: '/story/7.jpg'},
        { type: 'text', value: 'After the goblins were defeated, there was peace in the village for a short time. However, one morning, the villagers woke up to a loud noise coming from the forest. When Aris, along with the villagers, approached the forest, they saw a gigantic Ogre wandering near the village. The Ogre was damaging the villagers’ lands and frightening them.' },
        { type: 'text', value: 'Aris realized that this gigantic creature posed a great danger to the village. He set out to find the Ogre’s lair and stop it. As he ventured deeper into the forest, he followed the large footprints left by the Ogre. After a while, he reached a massive cave. At the entrance of the cave, the Ogre’s massive body was clearly visible.' },
        { type: 'text', value: 'Aris quietly entered the cave. Inside, the Ogre was sitting on a large rock throne. He held a huge sword in his massive hand. Aris decided to create a distraction using the surrounding stones to set a trap.' },
        { type: 'image', value: '/story/8.jpg'},
        { type: 'text', value: 'When the Ogre noticed Aris, he approached him in great anger. Aris used his agility to dodge the Ogre’s attacks. By activating his trap, Aris managed to crush the Ogre under a pile of large stones. The Ogre fell to the ground with a loud noise.' },
        { type: 'text', value: 'Aris returned to the village with the pride of defeating the Ogre. The villagers welcomed him with great enthusiasm and celebrated his heroism. Aris was filled with the pride of protecting his village, but he also knew that new adventures awaited him. Thanks to Aris’s courage and determination, the Village of Shadows was now a safer place.' },
      ]
    },
    {
      id: 5,
      story: [
        { type: 'text', value: 'Chapter 5: A New Day' },
        { type: 'text', value: 'The Village of Shadows regained its peace thanks to Aris’s heroism. The villagers expressed their gratitude to Aris by organizing a great celebration. Aris was filled with the pride of protecting his village, but he also knew that new adventures awaited him. Thanks to Aris’s courage and determination, the Village of Shadows was now a safer place.' },
        { type: 'text', value: 'Thus, Aris’s story spread not only in the Village of Shadows but throughout the surrounding area. His adventurous spirit and heroism became an inspiration beyond his village. Aris decided to set out on a new journey one day; because adventures never end, and brave hearts always await a new challenge.' },
      ]
    }
  ];
  

const StoryModal: React.FC<StoryModalProps> = ({ userLevel, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 w-4/5 h-4/5 p-4 overflow-y-auto rounded-lg">
        <button className="absolute top-10 right-10 text-black" onClick={onClose}>

        <Image
              src="/icons/cross.svg"
              alt="round"
              width={94}
              height={94}
             

            />
        </button>
        <div className="text-center text-5xl mb-4">Storyline</div>
        {story
          .filter(story => story.id <= userLevel)
          .map(story => (
            <div key={story.id} className="mb-4">
              {story.story.map((content, index) => (
                <div key={index} className="my-4">
                  {content.type === 'text' ? (
                    <p className=' text-xl'>{content.value}</p>
                  ) : (
                    <Image width={1000} height={1000} src={content.value} alt="" className="w-full" />
                  )}
                </div>
              ))}
             
            </div>
            
          ))}
           <p className='mb-10 mt-4 text-4xl text-green-400 opacity-70'>The story will continue as Hero make progress</p>
      </div>
    </div>
  );
};

export default StoryModal;
