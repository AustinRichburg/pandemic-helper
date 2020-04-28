export const Cities = [
    'Washington',
    'Atlanta',
    'New York',
    'Jacksonville',
    'Paris',
    'Cairo',
    'Tokyo'
];

export const Rate = [2, 2, 2, 3, 3, 4];


/* ==================================== GAME RULES ============================================== */
export const Rules = {
    /* ====================== VANILLA ========================== */
    'vanilla': [
        {
            category: 'Contents',
            text: [
                {
                    main: '7 Role Cards'
                },
                {
                    main: '7 Pawns'
                },
                {
                    main: '59 Player Cards',
                    subtext: '(48 City cards, 6 Epidemic cards, 5 Event cards)'
                },
                {
                    main: '4 Reference Cards'
                },
                {
                    main: '48 Infection Cards'
                },
                {
                    main: '96 Disease Cubes',
                    subtext: '24 in 4 colors'
                },
                {
                    main: '4 Cure Markers'
                },
                {
                    main: '1 Infection Rate marker'
                },
                {
                    main: '1 Outbreaks marker'
                },
                {
                    main: '6 Research stations'
                },
                {
                    main: '1 Board'
                }
            ],
            type: 'ul',
        },
        {
            category: 'Overview',
            text: [
                {
                    main: `In Pandemic, you and your fellow players are members of a disease control team. You must work together to develop cures
                    and prevent disease outbreaks, before 4 deadly diseases (Blue, Yellow, Black, and Red) contaminate humanity`
                },
                {
                    main: 'Pandemic is a cooperative game. The players all win or lose together.'
                }
            ],
            type: 'ul'
        },
        {
            category: 'Setup',
            text: [
                {
                    main: 'Set out the board and pieces',
                    subtext: `Place the board within easy reach of all players. Put the 6 research stations and disease
                    cubes nearby. Separate the cubes by color into 4 supply piles. Place 1 research station in Atlanta.`
                },
                {
                    main: 'Place outbreaks and cure markers',
                    subtext: `Place the outbreaks marker on the “0” space of the Outbreaks Track. Place the 4 cure
                    markers, “vial” side up, near the Discovered Cure Indicators`
                },
                {
                    main: 'Place infection rate marker and infect 9 cities',
                    subtext: `Place the infection rate marker on the left-most “2” space of the Infection Rate Track.
                    Shuffle the Infection cards and flip over 3 of them. Put 3 disease cubes of the matching color on
                    each of these cities. Flip over 3 more cards: put 2 disease cubes on each of these cities. Flip over
                    3 more cards: put 1 disease cube on each of these cities. (You will place a total of 18 disease
                    cubes, each matching the color of the city.) Place these 9 cards face up on the Infection Discard
                    Pile. The other Infection cards form the Infection Deck`
                },
                {
                    main: 'Give each players cards and a pawn',
                    subtext: `Give each player a reference card. Shuffle the Role cards and deal 1 face up in front of
                    each player. Place the matching colored pawns for these roles in Atlanta. Remove from the game the
                    remaining Role cards and pawns. Take the Epidemic cards out the Player Deck and set them aside until
                    Step 5. Shuffle the other Player cards (City and Event cards). Deal cards to the players to form
                    their initial hands. Give cards according to the number of players: 2-player game = 4 cards, 3-player
                    game = 3 cards, 4-player game = 2 cards.`
                },
                {
                    main: 'Prepare the player deck',
                    subtext: `Set the game’s difficulty level, by using either 4, 5, or 6 Epidemic cards, for an
                    Introductory, Standard, or Heroic game. Remove any unused Epidemic cards from the game. Divide the
                    remaining player cards into face down piles, as equal in size as you can, so that the number of
                    piles matches the number of Epidemic cards you are using. Shuffle 1 Epidemic card into each pile,
                    face down. Stack these piles to form the Player Deck, placing smaller piles on the bottom.`
                },
                {
                    main: 'Begin play',
                    subtext: `The players look at the City cards they have in their hand. The player with the highest
                    City population goes first.`
                }
            ],
            type: 'ol'
        },
        {
            category: 'Actions',
            subheader: `You may do up to 4 actions each turn. Select any combination of the actions listed below. You
            may do the same action several times, each time counting as 1 action. Your role’s special abilities may
            change how an action is done. Some actions involve discarding a card from your hand; all these discards go
            to the Player Discard Pile.`,
            text: [
                {
                    main: 'Drive/Ferry',
                    subtext: 'Move to a city connected by a white line to the one you are in.'
                },
                {
                    main: 'Direct Flight',
                    subtext: 'Discard a City card to move to the city named on the card.'
                },
                {
                    main: 'Charter Flight',
                    subtext: 'Discard the City card that matches the city you are in to move to any city.'
                },
                {
                    main: 'Shuttle Flight',
                    subtext: 'Move from a city with a research station to any other city that has a research station.'
                }
            ],
            type: 'ul'
        }
    ],
    /* ====================== SEASON ONE ========================== */
    'season-one': [

    ],
    /* ====================== SEASON TWO ========================== */
    'season-two': [

    ]
};