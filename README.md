# Spellcheck

I suck at spelling and this project was supposed to help me be better but it actually just made me accept that spelling is very hard. Anyway, here's the website assets including the audio clips. The actual process of generating new audio prompts can be found in a YouTube video I haven't published yet. 

# Known Issues
* Emoji results are awful for the colourblind
* Pronunciation goes very rogue at points
  * Examples : very, ascension, porcelain, rosin, reveille, hat, upon, portcullus, innovator, pie, vineyard, concatenate, javas, thrasonical, annual, fribourg, rubric, retrodict, expatiated, hem, hermeneutics, wizard, arsenic, power, expression, longitude, accordance, gonzo, toga, epoch
* Submit button on mobile is too close to keys - it might be worth just switching to a mobile keyboard
* On-screen keyboard is very laggy
* Spelling system is inconsistent between British and American spelling
  * Examples: medival, squints,
* "A adjective" - my bad, I forgot adjectives existed
* Some Chat-GPT etymology calls returned something akin to "My apologies, I do not understand your request"
  * Examples: aerials, autographs, scrambling, 
* Accidental refresh removes progress - may be better to store results into local storage (but also I have no idea if this will store results into a new day)
* Submitting on first word in practice mode will allow you to go into negative lives lmao
* Copy results sometimes fails (someone has recommended a fix)

# Possible Extensions

* Mass select + deleter character inputs
* Inserting characters without erasing
* Multiple accept options
* A version with game rooms and folks could follow the more traditional round and elimination format in spellings bees.
* Adding more words
* Word playback on results page
* Ability to store list of words for future practice

# SpellingBee
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
