from random import randint, sample
from string import ascii_letters


def random_string(min_: int = 5, max_: int = 10) -> str:
    return "".join(sample(ascii_letters, randint(min_, max_)))
