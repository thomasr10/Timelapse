<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260608195712 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, tmdb_id INT NOT NULL, type VARCHAR(150) NOT NULL, created_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_6A2CA10C55BCC5E58CDE5729 (tmdb_id, type), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, user_id INT NOT NULL, media_id INT NOT NULL, INDEX IDX_794381C6A76ED395 (user_id), INDEX IDX_794381C6EA9FDD75 (media_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE review_user (review_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6F279B513E2E969B (review_id), INDEX IDX_6F279B51A76ED395 (user_id), PRIMARY KEY (review_id, user_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(150) NOT NULL, profile_picture VARCHAR(200) NOT NULL, created_at DATETIME NOT NULL, display_username VARCHAR(150) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user_follows (id INT AUTO_INCREMENT NOT NULL, follower_id INT NOT NULL, following_id INT NOT NULL, INDEX IDX_136E9479AC24F853 (follower_id), INDEX IDX_136E94791816E3A3 (following_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user_media (id INT AUTO_INCREMENT NOT NULL, is_liked TINYINT NOT NULL, is_watched TINYINT NOT NULL, rating NUMERIC(2, 1) DEFAULT NULL, watched_at DATETIME DEFAULT NULL, media_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_88EE5A54EA9FDD75 (media_id), INDEX IDX_88EE5A54A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE watchlist (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(180) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, is_public TINYINT NOT NULL, user_id INT NOT NULL, INDEX IDX_340388D3A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE watchlist_media (watchlist_id INT NOT NULL, media_id INT NOT NULL, INDEX IDX_C4FF3AE083DD0D94 (watchlist_id), INDEX IDX_C4FF3AE0EA9FDD75 (media_id), PRIMARY KEY (watchlist_id, media_id)) DEFAULT CHARACTER SET utf8mb4');
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
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E9479AC24F853');
        $this->addSql('ALTER TABLE user_follows DROP FOREIGN KEY FK_136E94791816E3A3');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54EA9FDD75');
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54A76ED395');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3A76ED395');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE083DD0D94');
        $this->addSql('ALTER TABLE watchlist_media DROP FOREIGN KEY FK_C4FF3AE0EA9FDD75');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE review_user');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_follows');
        $this->addSql('DROP TABLE user_media');
        $this->addSql('DROP TABLE watchlist');
        $this->addSql('DROP TABLE watchlist_media');
    }
}
