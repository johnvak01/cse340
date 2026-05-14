CREATE TABLE ORGANIZATION (
	ORGANIZATION_ID SERIAL PRIMARY KEY,
	ORGANIZATION_NAME VARCHAR(150) NOT NULL,
	ORGANIZATION_DESCRIPTION TEXT NOT NULL,
	CONTACT_EMAIL VARCHAR(255) NOT NULL,
	LOGO_FILENAME VARCHAR(255) NOT NULL
);

INSERT INTO
	ORGANIZATION (
		ORGANIZATION_NAME,
		ORGANIZATION_DESCRIPTION,
		CONTACT_EMAIL,
		LOGO_FILENAME
	)
VALUES
	(
		'BrightFuture Builders',
		'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
		'info@brightfuturebuilders.org',
		'brightfuture-logo.png'
	),
	(
		'GreenHarvest Growers',
		'An urban farming collective promoting food sustainability and education in local neighborhoods.',
		'contact@greenharvest.org',
		'greenharvest-logo.png'
	),
	(
		'UnityServe Volunteers',
		'A volunteer coordination group supporting local charities and service initiatives.',
		'hello@unityserve.org',
		'unityserve-logo.png'
	);

SELECT
	*
FROM
	ORGANIZATION;

CREATE TABLE SERVICE_PROJECT (
	PROJECT_ID SERIAL PRIMARY KEY,
	ORGANIZATION_ID INTEGER FOREIGN KEY NOT NULL,
	PROJECT_TITLE VARCHAR(150) NOT NULL,
	PROJECT_DESCRIPTION TEXT NOT NULL,
	PROJECT_LOCATION TEXT NOT NULL,
	PROJECT_DATE DATE NOT NULL,
);

INSERT INTO
	SERVICE_PROJECT (
		ORGANIZATION_ID,
		PROJECT_TITLE,
		PROJECT_DESCRIPTION,
		PROJECT_LOCATION,
		PROJECT_DATE
	)
VALUES
	(1, "Park Maintenance", 	"Sweep roads, cut grass, and keep our parks looking great", "Pawnee", "2027-01-01"),
	(1, "Build Homes", 			"Show up with good hands to build homes for the homless", "Gotham", "2027-01-01"),
	(1, "Construct Cabins", 	"Upgrade the camp site with small lean-to cabins", "Narnia", "2027-01-01"),
	(1, "Install Benches", 		"Upgrade the city bus stops site with comfortable benches", "Gondor", "2027-01-01"),
	(1, "Trail Maintenance", 	"Keep our hiking trails in good condition", "Rohan", "2027-01-01"),
	(2, "Planting Garden", 		"Plant the first crop of the year in our community garden", "Hobbiton", "2027-01-01"),
	(2, "Weeding Garden", 		"Keep the plants growing in our community garden healthy", "Hobbiton", "2027-01-01"),
	(2, "Harvesting Garden", 	"Collect and process the food grown in our community garden", "Hobbiton", "2027-01-01"),
	(2, "Community Education", 	"Assist in adminstering seminars for the local schools and clubs", "Bree", "2027-01-01"),
	(2, "Signature Gathering", 	"Gather signatures for the legal expansion of our community garden", "Bree", "2027-01-01"),
	(3, "Sing to Elderly", 		"Entertain and visit the decrepit", "Tokyo", "2027-01-01"),
	(3, "Sort Canned Goods", 	"assist the local food bank in sorting donated food", "Bangkok", "2027-01-01"),
	(3, "Clean Building", 		"clean up the local community center after their weekly activities", "Berlin", "2027-01-01"),
	(3, "Highway Cleanup",		"pick up trash and notate road damage for a section of adopted highway", "Revachol", "2027-01-01"),
	(3, "Soup Kitchen",			"cook and distribute food to those who need it", "Athens", "2027-01-01");