<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260628183447 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_activity ADD watchlist_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_activity ADD CONSTRAINT FK_4CF9ED5A83DD0D94 FOREIGN KEY (watchlist_id) REFERENCES watchlist (id)');
        $this->addSql('CREATE INDEX IDX_4CF9ED5A83DD0D94 ON user_activity (watchlist_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_activity DROP FOREIGN KEY FK_4CF9ED5A83DD0D94');
        $this->addSql('DROP INDEX IDX_4CF9ED5A83DD0D94 ON user_activity');
        $this->addSql('ALTER TABLE user_activity DROP watchlist_id');
    }
}
