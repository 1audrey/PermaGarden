CREATE TABLE [dbo].[PlantsImages]
(
PlantImageId int identity (1,1) NOT NULL,
PlantImageTitle varchar(500) NOT NULL,
PlantImagePicture varchar(500) NOT NULL, 
    CONSTRAINT [PK_PlantsImages] PRIMARY KEY ([PlantImageId])
)
