<?php

namespace App\Entity;

use App\Repository\UserActivityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserActivityRepository::class)]
class UserActivity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $type = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'userActivities')]
    private ?UserMedia $userMedia = null;

    #[ORM\ManyToOne(inversedBy: 'userActivities')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne]
    private ?UserFollows $following = null;

    #[ORM\ManyToOne]
    private ?Watchlist $watchlist = null;

    #[ORM\ManyToOne]
    private ?Media $media = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUserMedia(): ?UserMedia
    {
        return $this->userMedia;
    }

    public function setUserMedia(?UserMedia $userMedia): static
    {
        $this->userMedia = $userMedia;

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

    public function getFollowing(): ?UserFollows
    {
        return $this->following;
    }

    public function setFollowing(?UserFollows $following): static
    {
        $this->following = $following;

        return $this;
    }

    public function getWatchlist(): ?Watchlist
    {
        return $this->watchlist;
    }

    public function setWatchlist(?Watchlist $watchlist): static
    {
        $this->watchlist = $watchlist;

        return $this;
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
}
