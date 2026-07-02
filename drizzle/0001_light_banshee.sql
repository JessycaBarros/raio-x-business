CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`profile` enum('visibilidade','autoridade','conteudo_sem_venda','funil','trafego_organico','anuncio_ineficiente','estrutura') NOT NULL,
	`answers` text,
	`notionSynced` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
