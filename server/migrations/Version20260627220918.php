<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260627220918 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_activity (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(150) NOT NULL, created_at DATETIME NOT NULL, media_id INT DEFAULT NULL, user_id INT NOT NULL, following_id INT DEFAULT NULL, INDEX IDX_4CF9ED5AEA9FDD75 (media_id), INDEX IDX_4CF9ED5AA76ED395 (user_id), INDEX IDX_4CF9ED5A1816E3A3 (following_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE user_activity ADD CONSTRAINT FK_4CF9ED5AEA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE user_activity ADD CONSTRAINT FK_4CF9ED5AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_activity ADD CONSTRAINT FK_4CF9ED5A1816E3A3 FOREIGN KEY (following_id) REFERENCES user_follows (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_activity DROP FOREIGN KEY FK_4CF9ED5AEA9FDD75');
        $this->addSql('ALTER TABLE user_activity DROP FOREIGN KEY FK_4CF9ED5AA76ED395');
        $this->addSql('ALTER TABLE user_activity DROP FOREIGN KEY FK_4CF9ED5A1816E3A3');
        $this->addSql('DROP TABLE user_activity');
    }
}
