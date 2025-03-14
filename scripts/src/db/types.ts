import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { movies } from "./schema";

export type Movie = InferSelectModel<typeof movies>;
