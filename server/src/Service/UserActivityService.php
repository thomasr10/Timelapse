<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\UserMedia;
use App\Entity\Media;
use App\Entity\Review;
use App\Entity\UserActivity;
use App\Entity\Watchlist;
use App\Repository\UserActivityRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserActivityService
{
    public function __construct(
        private EntityManagerInterface $em, 
        private UserActivityRepository $userActivityRepository
    ){}

    public function createMediaActivity(string $type, UserMedia $userMedia, User $user, Media $media): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function createWatchlistActivity(string $type, Watchlist $watchlist, User $user, Media $media, UserMedia $userMedia): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setWatchlist($watchlist);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function createReviewActivity(string $type, Review $review, User $user, Media $media, UserMedia $userMedia): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setReview($review);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function userRecentActivity(User $user)
    {
        $userActivity = $this->userActivityRepository->findByUser($user);

        $unique = [];
        $seen = [];

        foreach ($userActivity as $entity) {
            $key = $entity->getType() . '_' . $entity->getUserMedia()->getId();

            if (!isset($seen[$key])) {
                $seen[$key] = true;
                $unique[] = $entity;
            }
        }

        return array_slice($unique, 0, 3);
    }
}