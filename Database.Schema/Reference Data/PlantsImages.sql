SET IDENTITY_INSERT PlantsImages ON
GO

MERGE INTO PlantsImages AS Target
USING (
	VALUES
		(1, 'Green Beans', 'assets/images/green-beans.jpg')
		, (2, 'Apples', 'assets/images/apples.jpg')
		, (3, 'Carrots', 'assets/images/carrots.jpg')
		, (4, 'Spring Onions','assets/images/spring-onions.jpg')
		, (5, 'Navy Beans','assets/images/navy-beans.jpg')

)
AS Source (PlantImageId, PlantImageTitle, PlantImagePicture)
ON Target.PlantImageId = Source.PlantImageId

WHEN MATCHED THEN
UPDATE SET
	PlantImageTitle = Source.PlantImageTitle,
	PlantImagePicture = Source.PlantImagePicture

WHEN NOT MATCHED BY TARGET THEN
INSERT
	(PlantImageId
	, PlantImageTitle
	, PlantImagePicture)

VALUES
	(Source.PlantImageId
	, Source.PlantImageTitle
	, Source.PlantImagePicture);
GO

SET IDENTITY_INSERT PlantsImages OFF
GO