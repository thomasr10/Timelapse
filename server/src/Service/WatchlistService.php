<?php

namespace App\Service;

use App\Entity\Watchlist;
use App\Entity\User;
use App\Repository\WatchlistRepository;
use Doctrine\ORM\EntityManagerInterface;

class WatchlistService
{   
    public function __construct(private EntityManagerInterface $em, private WatchlistRepository $watchlistRepository){}

    public function create(string $title, string $description, bool $is_public, User $user): Watchlist
    {
        $watchlist = new Watchlist();
        $watchlist->setTitle($title);
        $watchlist->setDescription($description);
        $watchlist->setIsPublic($is_public);
        $watchlist->setCreatedAt(new \DateTimeImmutable());
        $watchlist->setUpdatedAt(new \DateTimeImmutable());
        $watchlist->SetUser($user);
        $this->em->persist($watchlist);
        $this->em->flush();

        return $watchlist;
    }

    public function getAllWatchlistOfUser(User $user): ?array
    {
        $watchlists = $this->watchlistRepository->findByUser($user);
        return $watchlists;
    }

    public function findById(int $watchlist_id): ?Watchlist
    {
        return $this->watchlistRepository->find($watchlist_id);
    }

    public function delete(Watchlist $watchlist): void
    {
        $this->em->remove($watchlist);
        $this->em->flush();
        return;
    }

    public function update(Watchlist $watchlist): void
    {
        $watchlist->setUpdatedAt(new \DatetimeImmutable());
        return;
    }
}