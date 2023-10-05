import { defineCollection } from "astro:content";
import { blogSchema } from "./_schemas";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: blogSchema,
});

export const collections = { blog };
