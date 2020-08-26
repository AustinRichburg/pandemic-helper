from .City import City

class Game:
    """Class to handle the game logic"""

    cities = [
        'Washington',
        'Atlanta',
        'New York',
        'Jacksonville',
        'Paris',
        'Cairo',
        'Tokyo'
    ];
    rate = [2, 2, 2, 3, 3, 4]

    deck: dict = {}
    totals: [int]
    curr_total: int
    index: int
    epidemic_index:int
    game_history: [str]

    def __init__(self):
        self.deck = {}
        self.totals = [0]
        self.curr_total = 0
        self.index = 0
        self.epidemic_index = 0
        self.game_history = []
        for city in self.cities:
            self.deck[city] = City(city)
            self.totals[self.index] += self.deck[city].get_total_in_deck()

    def is_game_over(self):
        return self.epidemic_index >= len(self.rate)
    
    def draw_card(self, name):
        """
        Logic for the card that was drawn. Increments current totals and decrements previous totals.
        """

        if not self.deck[name].draw(self.index):
            return False

        self.game_history.append(name + ' was drawn.')

        self.curr_total += 1
        self.totals[self.index] -= 1

        if self.totals[self.index] == 0:
            self.index -= 1
        
        return True
    
    def epidemic(self):
        """
        Handles the deck in the event of an epidemic. It increases the deck indexes and updates the totals,
        past and present. It is possible for two epidemics to get drawn back-to-back, so there is logic to handle
        that as well.
        """

        self.epidemic_index += 1
        self.game_history.append('Epidemic ' + str(self.epidemic_index) + ' occured.')

        if self.is_game_over():
            return True;

        # In the unlikely event of a back-to-back epidemic, don't do anything
        if self.curr_total == 0:
            return False

        # Increment index
        self.index += 1

        # Add the total of cards drawn this round to the totals array
        self.totals.append(self.curr_total)
        self.curr_total = 0

        # Add the number of cities drawn this round to the past drawn array
        for city in self.deck:
            self.deck[city].handle_epidemic()

    def add_note(self, city, note: str):
        self.deck[city].notes.append(note)

    def delete_note(self, city, i):
        del self.deck[city].notes[i]

    def get_last_total(self):
        return self.totals[self.index]

    def get_epidemic_index(self):
        return self.epidemic_index

    def get_index(self):
        return self.index
    
    def get_deck(self):
        return self.deck

    def get_notes(self, city):
        return self.deck[city].notes
    
    def get_game_history(self):
        return self.game_history

    def to_dict(self):
        jsonDeck = {}
        for city in self.deck:
            cityDict = self.deck[city].to_dict()
            cityDict['chance'] = self.deck[city].chance(self.index, self.totals[self.index])
            cityDict['in_deck'] = self.deck[city].in_deck(self.index)
            jsonDeck[city] = cityDict
        return {
            'deck': jsonDeck,
            'epidemic_index': self.epidemic_index,
            'game_history': self.game_history
        }

    def save_game_dict(self):
        return {
            **self.to_dict(),
            'totals': self.totals,
            'curr_total': self.curr_total,
            'index': self.index
        }

    
    def load_game(self, game):
        for city in game['deck']:
            self.deck[city].set_loaded_values(game['deck'][city])

        self.epidemic_index = game['epidemic_index']
        self.game_history = game['game_history']
        self.totals = game['totals']
        self.curr_total = game['curr_total']
        self.index = game['index']
