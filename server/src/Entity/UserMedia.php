<?php

namespace App\Entity;

use App\Repository\UserMediaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserMediaRepository::class)]
class UserMedia
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Media $media = null;

    #[ORM\ManyToOne(inversedBy: 'userMedia')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    private ?bool $is_liked = null;

    #[ORM\Column]
    private ?bool $is_watched = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 2, scale: 1, nullable: true)]
    private ?string $rating = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $watched_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMedia(): ?Media
    {
        return $this->media;
    }

    public function setMedia(?Media $media): static
    {
        $this->media = $media;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function isLiked(): ?bool
    {
        return $this->is_liked;
    }

    public function setIsLiked(bool $is_liked): static
    {
        $this->is_liked = $is_liked;

        return $this;
    }

    public function isWatched(): ?bool
    {
        return $this->is_watched;
    }

    public function setIsWatched(bool $is_watched): static
    {
        $this->is_watched = $is_watched;

        return $this;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function setRating(string $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getWatchedAt(): ?\DateTimeImmutable
    {
        return $this->watched_at;
    }

    public function setWatchedAt(?\DateTimeImmutable $watched_at): static
    {
        $this->watched_at = $watched_at;

        return $this;
    }
}
