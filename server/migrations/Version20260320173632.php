<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260320173632 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE display_user display_username VARCHAR(150) NOT NULL');
        $this->addSql('ALTER TABLE user_follows ADD CONSTRAINT FK_136E9479AC24F853 FOREIGN KEY (follower_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_follows ADD CONSTRAINT FK_136E94791816E3A3 FOREIGN KEY (following_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_media ADD CONSTRAINT FK_88EE5A54EA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE user_media ADD CONSTRAINT FK_88EE5A54A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE watchlist_media ADD CONSTRAINT FK_C4FF3AE083DD0D94 FOREIGN KEY (watchlist_id) REFERENCES watchlist (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE watchlist_media ADD CONSTRAINT FK_C4FF3AE0EA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE display_username display_user VARCHAR(150) NOT NULL');
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E9479AC24F853');
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E94791816E3A3');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54EA9FDD75');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54A76ED395');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3A76ED395');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE083DD0D94');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE0EA9FDD75');
    }
}
