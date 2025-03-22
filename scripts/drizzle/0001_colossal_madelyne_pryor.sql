ALTER TABLE "movies" ALTER COLUMN "descriptionFull" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "movies" ADD COLUMN "backgroundImageOriginal" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "descriptionIntro";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "backgroundImage_original";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "mediumScreenshotImage1";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "mediumScreenshotImage2";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "mediumScreenshotImage3";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "largeScreenshotImage1";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "largeScreenshotImage2";--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN "largeScreenshotImage3";