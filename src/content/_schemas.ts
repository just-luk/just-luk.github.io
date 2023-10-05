import { z } from "astro:content";

export const blogSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		heroImage: z.string(),
		tags: z.array(z.string()).default(["others"]),
		readingTime: z.string().optional(),
	})
	.strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
