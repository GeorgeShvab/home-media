CREATE TABLE "actors" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"imageUrl" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"movieId" integer NOT NULL,
	"actorId" integer NOT NULL,
	"characterName" varchar(255) NOT NULL,
	CONSTRAINT "characters_actorId_movieId_pk" PRIMARY KEY("actorId","movieId")
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres_to_movies" (
	"genreId" varchar(255) NOT NULL,
	"movieId" integer NOT NULL,
	CONSTRAINT "genres_to_movies_movieId_genreId_pk" PRIMARY KEY("movieId","genreId")
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
	"rating" numeric NOT NULL,
	"runtime" integer NOT NULL,
	"description" text NOT NULL,
	"ytTrailerCode" varchar(255) NOT NULL,
	"language" varchar(255) NOT NULL,
	"backgroundImage" varchar(255) NOT NULL,
	"backgroundImageOriginal" varchar(255) NOT NULL,
	"smallCoverImage" varchar(255) NOT NULL,
	"mediumCoverImage" varchar(255) NOT NULL,
	"largeCoverImage" varchar(255) NOT NULL,
	"movieDbId" integer NOT NULL,
	"adult" boolean NOT NULL,
	"budget" bigint,
	"revenue" bigint,
	"homePage" varchar(255),
	"originCountry" varchar(255)[] NOT NULL,
	"popularity" numeric NOT NULL,
	"productionCompanies" varchar(255)[] NOT NULL,
	"productionCountries" varchar(255)[] NOT NULL,
	"releaseDate" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"voteAverage" numeric NOT NULL,
	"voteCount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(255) NOT NULL,
	"hash" varchar(255) NOT NULL,
	"quality" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"isRepack" boolean NOT NULL,
	"videoCodec" varchar(255) NOT NULL,
	"bitDepth" integer NOT NULL,
	"audioChannels" varchar(255) NOT NULL,
	"size" varchar(255) NOT NULL,
	"sizeBytes" bigint NOT NULL,
	"movieId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_actorId_actors_id_fk" FOREIGN KEY ("actorId") REFERENCES "public"."actors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genres_to_movies" ADD CONSTRAINT "genres_to_movies_genreId_genres_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genres_to_movies" ADD CONSTRAINT "genres_to_movies_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;