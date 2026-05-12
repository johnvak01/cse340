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