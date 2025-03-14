CREATE TABLE "actors" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"imageUrl" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" integer PRIMARY KEY NOT NULL,
	"imdbCode" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"titleEnglish" varchar(255) NOT NULL,
	"titleLong" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"rating" integer NOT NULL,
	"runtime" integer NOT NULL,
	"descriptionIntro" varchar(1000) NOT NULL,
	"descriptionFull" varchar(1000) NOT NULL,
	"ytTrailerCode" varchar(255) NOT NULL,
	"language" varchar(255) NOT NULL,
	"mpaRating" integer NOT NULL,
	"backgroundImage" varchar(255) NOT NULL,
	"backgroundImage_original" varchar(255) NOT NULL,
	"smallCoverImage" varchar(255) NOT NULL,
	"mediumCoverImage" varchar(255) NOT NULL,
	"largeCoverImage" varchar(255) NOT NULL,
	"mediumScreenshotImage1" varchar(255) NOT NULL,
	"mediumScreenshotImage2" varchar(255) NOT NULL,
	"mediumScreenshotImage3" varchar(255) NOT NULL,
	"largeScreenshotImage1" varchar(255) NOT NULL,
	"largeScreenshotImage2" varchar(255) NOT NULL,
	"largeScreenshotImage3" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sources_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" varchar(255) NOT NULL,
	"hash" varchar(255) NOT NULL,
	"quality" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"isRepack" boolean NOT NULL,
	"videoCodec" varchar(255) NOT NULL,
	"bitDepth" integer NOT NULL,
	"audioChannels" varchar(255) NOT NULL,
	"size" varchar(255) NOT NULL,
	"sizeBytes" integer NOT NULL,
	"movieId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;