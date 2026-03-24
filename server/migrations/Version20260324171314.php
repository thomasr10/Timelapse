<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260324171314 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, user_id INT NOT NULL, media_id INT NOT NULL, INDEX IDX_794381C6A76ED395 (user_id), INDEX IDX_794381C6EA9FDD75 (media_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE review_user (review_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6F279B513E2E969B (review_id), INDEX IDX_6F279B51A76ED395 (user_id), PRIMARY KEY (review_id, user_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6EA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE review_user ADD CONSTRAINT FK_6F279B513E2E969B FOREIGN KEY (review_id) REFERENCES review (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE review_user ADD CONSTRAINT FK_6F279B51A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
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
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6A76ED395');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6EA9FDD75');
        $this->addSql('ALTER TABLE review_user DROP FOREIGN KEY FK_6F279B513E2E969B');
        $this->addSql('ALTER TABLE review_user DROP FOREIGN KEY FK_6F279B51A76ED395');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE review_user');
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E9479AC24F853');
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E94791816E3A3');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54EA9FDD75');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54A76ED395');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3A76ED395');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE083DD0D94');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE0EA9FDD75');
    }
}
