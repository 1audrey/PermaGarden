SET IDENTITY_INSERT PlantsImages ON
GO

MERGE INTO PlantsImages AS Target
USING (
	VALUES
		(1, 'Green Beans', 'green-beans.jpg')
		, (2, 'Apples', 'apples.jpg')
		, (3, 'Carrots', 'carrots.jpg')
		, (4, 'Spring Onions','spring-onions.jpg')
		, (5, 'Navy Beans','navy-beans.jpg')

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