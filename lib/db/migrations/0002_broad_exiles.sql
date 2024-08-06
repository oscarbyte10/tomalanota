CREATE INDEX IF NOT EXISTS "item_name_idx" ON "menu_items" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "menu_section_id_idx" ON "menu_items" USING btree ("menu_section_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "section_name_idx" ON "menu_sections" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspace_id_idx" ON "menu_sections" USING btree ("workspace_id");