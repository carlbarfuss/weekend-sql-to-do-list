CREATE TABLE todo(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (100) NOT NULL,
	"notes" VARCHAR (250) NOT NULL,
	"date_due" VARCHAR (100), 
	"completed" BOOLEAN DEFAULT 'false'
); 


INSERT INTO "todo" ("task", "notes", "date_due", "completed") VALUES ('Turn Assignment In', 'Dont be late this week', '6PM', TRUE);
INSERT INTO "todo" ("task", "notes", "date_due") VALUES ('stock up on TP', 'none of that single ply crap', 'before apolcalypse');
INSERT INTO "todo" ("task", "notes", "date_due", "completed") VALUES ('install shelves in kids rooms', 'make sure to find the stud this time, genius', 'Sunday', TRUE);
INSERT INTO "todo" ("task", "notes", "date_due") VALUES ('teach kids to play MTG', 'dont start them with blue deck', 'Thanksgiving break');
INSERT INTO "todo" ("task", "notes", "date_due") VALUES ('shop for Thanksgiving', 'tell Matt that dairy allergies are fake news', 'Sunday');
