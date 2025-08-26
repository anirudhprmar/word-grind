ALTER TABLE "wordgrind_session" ADD COLUMN "impersonated_by" text;--> statement-breakpoint
ALTER TABLE "wordgrind_user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "wordgrind_user" ADD COLUMN "banned" boolean;--> statement-breakpoint
ALTER TABLE "wordgrind_user" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "wordgrind_user" ADD COLUMN "ban_expires" timestamp;