import random

MAX_TRIALS = 3

def play():
    secret = random.randint(1, 100)
    attempts = 0
    wrong_trials = MAX_TRIALS

    print("🎯 I'm thinking of a number between 1 and 100.")
    print(f"You have {MAX_TRIALS} incorrect guesses allowed.\n")

    while True:
        try:
            guess = int(input("Your guess: "))
        except ValueError:
            print("⚠️ Please enter a whole number.")
            continue

        if guess < 1 or guess > 100:
            print("⚠️ Please enter a number between 1 and 100.")
            continue

        attempts += 1

        if guess < secret:
            print("📈 Too low!")
            wrong_trials -= 1
        elif guess > secret:
            print("📉 Too high!")
            wrong_trials -= 1
        else:
            print(f"🎉 Correct! You got it in {attempts} tries.")
            break

        if wrong_trials <= 0:
            print(f"❌ Out of trials! The number was {secret}.")
            break

        print(f"   Trials left: {wrong_trials}\n")

if __name__ == "__main__":
    play()