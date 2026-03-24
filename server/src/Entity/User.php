<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 150, unique: true)]
    private ?string $username = null;

    #[ORM\Column(length: 200)]
    private ?string $profile_picture = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    /**
     * @var Collection<int, Watchlist>
     */
    #[ORM\OneToMany(targetEntity: Watchlist::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $watchlists;

    /**
     * @var Collection<int, UserMedia>
     */
    #[ORM\OneToMany(targetEntity: UserMedia::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $userMedia;

    /**
     * @var Collection<int, UserFollows>
     */
    #[ORM\OneToMany(targetEntity: UserFollows::class, mappedBy: 'follower', orphanRemoval: true)]
    private Collection $userFollows;

    #[ORM\Column(length: 150)]
    private ?string $display_username = null;

    /**
     * @var Collection<int, Review>
     */
    #[ORM\OneToMany(targetEntity: Review::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $reviews;

    public function __construct()
    {
        $this->watchlists = new ArrayCollection();
        $this->userMedia = new ArrayCollection();
        $this->userFollows = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Ensure the session doesn't contain actual password hashes by CRC32C-hashing them, as supported since Symfony 7.3.
     */
    public function __serialize(): array
    {
        $data = (array) $this;
        $data["\0".self::class."\0password"] = hash('crc32c', $this->password);

        return $data;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profile_picture;
    }

    public function setProfilePicture(string $profile_picture): static
    {
        $this->profile_picture = $profile_picture;

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

    /**
     * @return Collection<int, Watchlist>
     */
    public function getWatchlists(): Collection
    {
        return $this->watchlists;
    }

    public function addWatchlist(Watchlist $watchlist): static
    {
        if (!$this->watchlists->contains($watchlist)) {
            $this->watchlists->add($watchlist);
            $watchlist->setUser($this);
        }

        return $this;
    }

    public function removeWatchlist(Watchlist $watchlist): static
    {
        if ($this->watchlists->removeElement($watchlist)) {
            // set the owning side to null (unless already changed)
            if ($watchlist->getUser() === $this) {
                $watchlist->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, UserMedia>
     */
    public function getUserMedia(): Collection
    {
        return $this->userMedia;
    }

    public function addUserMedium(UserMedia $userMedium): static
    {
        if (!$this->userMedia->contains($userMedium)) {
            $this->userMedia->add($userMedium);
            $userMedium->setUser($this);
        }

        return $this;
    }

    public function removeUserMedium(UserMedia $userMedium): static
    {
        if ($this->userMedia->removeElement($userMedium)) {
            // set the owning side to null (unless already changed)
            if ($userMedium->getUser() === $this) {
                $userMedium->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, UserFollows>
     */
    public function getUserFollows(): Collection
    {
        return $this->userFollows;
    }

    public function addUserFollow(UserFollows $userFollow): static
    {
        if (!$this->userFollows->contains($userFollow)) {
            $this->userFollows->add($userFollow);
            $userFollow->setFollower($this);
        }

        return $this;
    }

    public function removeUserFollow(UserFollows $userFollow): static
    {
        if ($this->userFollows->removeElement($userFollow)) {
            // set the owning side to null (unless already changed)
            if ($userFollow->getFollower() === $this) {
                $userFollow->setFollower(null);
            }
        }

        return $this;
    }

    public function getDisplayUsername(): ?string
    {
        return $this->display_username;
    }

    public function setDisplayUser(string $display_username): static
    {
        $this->display_username = $display_username;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): static
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setUser($this);
        }

        return $this;
    }

    public function removeReview(Review $review): static
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getUser() === $this) {
                $review->setUser(null);
            }
        }

        return $this;
    }
}
