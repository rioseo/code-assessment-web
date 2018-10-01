# Notes

Please read this document to find about the challanges, decisions, and problems I had during the development of this project.

## UX Questions & Decisions
I couldn't figure out a few parts of the UX design from the mocks, so I have made assumptions and proceeded. Here are the concerns:
1. The mocks show phone numbers, but I cannot find it in the json data, so I've added a place-holder for it.
2. The mocks show a title as "Found 3 taco truck in 92121". I couldn't find a zip lookup parameter for API GET call, or at least it was not documented. So, I just made the GET call as given the docuementation. Related to this, then since the distance on the top right corner of each card is related to this zip code, I just replaced it with the name of the truck location from it's object. I just added a counter for number of returned items from GET and added it to the nave bar for desktop.
3. Top nav menu items are just place-holders, they don't do anything.
4. Initially, I had a page scroll-bar for the desktop view, but scrolling to a card was awkward, so now the height of the card list and also the map are mapped to viewport's height, and this will look more like an "app", rather than a "web page".
5. For mobile view, the design was confusing.  
   1. Are the "list" and "map" clickable buttons? If yes, which location will be displayed if user clicks the "map" button, not a card? Then how the maps is displayed? If it is a modal, it needs to be closed somehow, like the details dialog.
   2. If they're not buttons, but just indicators, I would say it's a confusing UX design, because not only they look like buttons and user want to click them, but also they are not necessary.
6. Having all these, I decided to add the location map div, after the location cards list. Clicking a card will scroll down to the map, then there is a back-to-card button to take you back to the clicked card.
7. In mobile view, the details modal dialog is set to "fixed" position to cover the whole screen.

## Documentation
1. As a usual practice, I have added general project information to the readme.md
2. I usually add a /docs folder and .md files under it for each feature of the project, here I've added just 2 to just show how it works.
3. I usually keep the inline code comments/documentations to minimal, if my code is not readable without the comments, it means it smells.

## Development
1. I decided to learn and use a simple data-binding framework for the sake of this project, and I found knockout.js simple and light-weight, so I went for it.
2. On the bright side, I can show off that I learned a new framework in a few hours and successfully used it, on the dark side, I couldn't figure out how to bind the currently selected data object to the modal dialog binding context, so I fell back to jQuery for this section of the website.

## Styles
1. I used a hierarchical Sass structure to organize sections of styling in different files.
2. A single minifed styles.min.css is added to the html page. I have used Visual Studio "Bundler and Minifier" extension to achieve this. It uses a built-in task runner to re-bundle and minify files, everytime you save them.

## Scripts
1. app.js and app.min.js are generated files, outputs of Visual Studio "Bundler and Minifier" extension.
2. Significant logics of the app happen in scripts.js. In this file, TruckLocationsViewModel() is the heart of the data binding, and TacoTruckLocation() is the model object.
   1. As mentioned in the "Development" section, I couldn't figure out how to bind a sub-sectin of the page (modal dialog) to the currently selected data object. I'm certain that there should be a way to have a new binding context for an element hierarchy in DOM.
   2. So in showMoreInfo(), I'm using the good old (but ugly) jQuery to wire the data item to the modal dialog elements.


