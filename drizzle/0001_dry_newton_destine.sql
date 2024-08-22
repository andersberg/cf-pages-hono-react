CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
