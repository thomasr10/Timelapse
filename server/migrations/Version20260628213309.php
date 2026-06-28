<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260628213309 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_activity ADD media_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_activity ADD CONSTRAINT FK_4CF9ED5AEA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('CREATE INDEX IDX_4CF9ED5AEA9FDD75 ON user_activity (media_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_activity DROP FOREIGN KEY FK_4CF9ED5AEA9FDD75');
        $this->addSql('DROP INDEX IDX_4CF9ED5AEA9FDD75 ON user_activity');
        $this->addSql('ALTER TABLE user_activity DROP media_id');
    }
}
