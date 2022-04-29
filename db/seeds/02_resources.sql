INSERT INTO resources(user_id, url, title, description, category, created_at, deleted_on)
VALUES
(1,'https://www.codecademy.com/', 'codecademy', 'learn how to do hard things when they are too hard to figure out alone', 'coding', now()::date, NULL),
(1,'https://www.khanacademy.org/', 'Khan Academy', 'learn how to do hard things when they are too hard to figure out alone', 'educational', now()::date, NULL),
(1,'https://www.lighthouselabs.ca/', 'Lighthouse Lab', 'learn how to do hard things when video tutorials arent enough and you need teachers and mentors', 'coding', now()::date, NULL),
(1,'https://www.deviantart.com/', 'Deviant Art', 'The largest Online Art Gallery and Community', 'art', now()::date, NULL),
(1,'https://www.w3schools.com/', 'w3schools', 'learn how to do hard things when they are too hard to figure out alone', 'coding', now()::date, NULL),
(1,'https://www.youtube.com/watch?v=mhDJNfV7hjk', 'Gordan Ramsey Cooking', 'While a lot of us are remaining indoors, here are a few quick, simple and cheap recipes to follow to learn.', 'cooking', now()::date, NULL)
;
