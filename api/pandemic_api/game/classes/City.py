class City:

    name: str
    number_in_deck: int
    totals: [int]
    curr_drawn: int
    notes: [str]

    def __init__(self, name):
        self.name = name
        self.number_in_deck = 3
        self.totals = [3]
        self.curr_drawn = 0
        self.notes = []

    def get_name(self):
        return self.name

    def get_total_in_deck(self):
        return self.number_in_deck

    def chance(self, i, last_total):
        try:
            return round((self.totals[i] / last_total) * 100, 2)
        except ZeroDivisionError as e:
            return 0

    def in_deck(self, i):
        return self.totals[i]

    def draw(self, i):
        if (self.totals[i] == 0):
            return False

        self.curr_drawn += 1
        self.totals[i] -= 1
        return True

    def handle_epidemic(self):
        self.totals.append(self.curr_drawn)
        self.curr_drawn = 0

    def set_loaded_values(self, city):
        self.totals = city['totals']
        self.curr_drawn = city['curr_drawn']
        self.notes = city['notes']

    def to_dict(self):
        return {
            'name': self.name,
            'totals': self.totals,
            'curr_drawn': self.curr_drawn,
            'notes': self.notes
        }