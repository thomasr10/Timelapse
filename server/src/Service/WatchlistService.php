<?php

namespace App\Service;

use App\Entity\Watchlist;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class WatchlistService
{   
    public function __construct(private EntityManagerInterface $em){}

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
}