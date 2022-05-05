INSERT INTO resources(user_id, url, title, description, category, created_at, deleted_on)
VALUES
(1,'https://www.codecademy.com/', 'codecademy', 'learn how to do hard things when they are too hard to figure out alone', 'Coding', now()::date, NULL),
(2,'https://www.khanacademy.org/', 'Khan Academy', 'learn how to do hard things when they are too hard to figure out alone', 'Educational', now()::date, NULL),
(1,'https://www.lighthouselabs.ca/', 'Lighthouse Lab', 'learn how to do hard things when video tutorials arent enough and you need teachers and mentors', 'Coding', now()::date, NULL),
(2,'https://www.deviantart.com/', 'Deviant Art', 'The largest Online Art Gallery and Community', 'Art', now()::date, NULL),
(1,'https://www.w3schools.com/', 'w3schools', 'learn how to do hard things when they are too hard to figure out alone', 'Coding', now()::date, NULL),
(2,'https://www.healthyrecipesblogs.com/baked-chicken-wings/', 'Baked Chicken Wings', 'Baked chicken wings are so easy to make, and they come out of the oven crispy and delicious. Theres no need for flour!', 'Cooking', now()::date, NULL),
(1,'https://www.tasty.co/article/hannahloewentheil/fall-slow-cooker-recipes', '40 Slow Cooker Recipes', 'Here Are 40 Slow Cooker Recipes To Make Every Night This Month', 'Cooking', now()::date, NULL),
(2,'https://www.planetware.com/world/top-cities-in-the-world-to-visit-eng-1-39.htm', 'Top cities to visit', '29 Top Cities in the World to Visit', 'travel', now()::date, NULL),
(1,'https://www.nomadicmatt.com/travel-guides/vietnam-travel-tips/', 'Backpacking Vietnam Travel Guide', 'You’ve probably seen it in the background of countless war movies, but nothing can prepare you for the epic beauty of traveling Vietnam.', 'Travel', now()::date, NULL),
(2,'https://www.travelandleisure.com/travel-guide/tulum', 'Tulum Travel Guide', 'Tulum is a bohemian paradise, bursting with immaculately designed hotels, spiritual centers, and restaurants that perfectly execute both ambiance and flavor.', 'Travel', now()::date, NULL),
(1,'https://www.sarahmaker.com/how-to-crochet/', 'How to Crochet', 'Crochet is a fun, relaxing hobby that anyone can do! In this step-by-step guide, we will discuss how to crochet.', 'Art', now()::date, NULL),
(2,'https://www.modestfish.com/aquascape/', 'Aquascaping Guide', 'Aquascaping is the arrangement of rocks, driftwood and live plants in an aquarium to create a visually appealing scene.', 'Art', now()::date, NULL),
(1,'https://www.solarsystem.nasa.gov/basics/', 'Basics of Space Flight', 'Basics of Space Flight is a tutorial designed primarily as a quick training guide for mission operations people.', 'Educational', now()::date, NULL),
(2,'https://www.idbentley.com/', 'idbentley', 'Quite possibly the greatest resource for aspiring software developers.', 'Coding', now()::date, NULL),
(1,'https://www.ipcc.ch/', 'IPCC', 'The Intergovernmental Panel on Climate Change (IPCC) is the United Nations body for assessing the science related to climate change.', 'Educational', now()::date, NULL)
;
